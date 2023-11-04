import gmail from "../assets/images/gmail.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// Import the Firebase Auth SDK
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const googleAuthProvider = new GoogleAuthProvider();

export default function Signup() {
  // form data
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  // error control
  const [lengthError, setLengthError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [matchPassError, setMatchPassError] = useState(false);
  const [fillError, setFillError] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  // regex validator for email
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const validateFullName = (name) => {
    const fullNameRegex = /^[a-zA-Z\s]+$/i;
    return fullNameRegex.test(name);
  };

  // handling form filling
  function handleChange(event) {
    const { name, value } = event.target;
    // handle password ontime errors
    if (name == "password" && value.length > 0 && value.length < 8) {
      setLengthError(true);
    } else {
      setLengthError(false);
    }
    if (name == "email" && !validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (name == "name" && !validateFullName(value)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (
      (name == "password" && value != data.confirm) ||
      (name == "confirm" && value != data.password)
    ) {
      setMatchPassError(true);
    } else {
      setMatchPassError(false);
    }

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  const navigate = useNavigate();

  const createUser = async (nm: String, mail: String, phn: String) => {
    await addDoc(collection(db, "users"), {
      name: nm,
      email: mail,
      phone: phn,
    });
  };

  const getUser = async (email: String) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());
    return users.some((user) => user.email === email);
  };

  // handle submission
  async function handleSubmit(event) {
    event.preventDefault();

    const { name, email, phone, password, confirm } = data;
    if (!name || !email || !phone || !password || !confirm) {
      setFillError(true);
      return;
    }

    // If all fields are filled, check for other errors
    if (lengthError || emailError || matchPassError) {
      console.log("could not sign up");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await createUser(name, email, phone);
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setNotLoggedIn(true);
      console.error(error);
      return;
    }

    // Clear the form data
    setNameError(false);
    setEmailError(false);
    setFillError(false);
    setLengthError(false);
    setMatchPassError(false);
    setData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm: "",
    });

    navigate("/search");
    window.location.reload();
  }

  // signing up with google
  const signupGoogle = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleAuthProvider);
      const user = userCredentials.user;
      const exists = await getUser(user.email)
      if (!exists) {
        await createUser("Full Name", user.email, "+213555000000");
      }
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setNotLoggedIn(true);
      console.error(error);
      return;
    }

    navigate("/search");
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription className="text-black font-medium">
          Join us now and save a life
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Abu Ubaida"
            onChange={handleChange}
            value={data.name}
          />
        </div>
        {nameError && (
          <p className="error-msg-auth">Enter your real valid name</p>
        )}
        <div className="space-y-1">
          <Label htmlFor="username">Email</Label>
          <Input
            name="email"
            value={data.email}
            type="email"
            id="email"
            placeholder="abuubaida@gmail.com"
            onChange={handleChange}
          />
        </div>
        {emailError && (
          <p className="error-msg-auth">Enter your valid Email Address</p>
        )}
        <div className="space-y-1">
          <Label htmlFor="username">Phone</Label>
          <Input
            name="phone"
            value={data.phone}
            type="number"
            id="phone"
            placeholder="+213540121212"
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Password</Label>
          <Input
            name="password"
            value={data.password}
            type="password"
            id="password"
            placeholder="at least 8 characters"
            onChange={handleChange}
          />
        </div>
        {lengthError && (
          <p className="error-msg-auth">
            Password must be 8 characters at least
          </p>
        )}
        <div className="space-y-1">
          <Label htmlFor="username">Confirm Password</Label>
          <Input
            name="confirm"
            value={data.confirm}
            type="password"
            id="confirm"
            placeholder="must match password"
            onChange={handleChange}
          />
        </div>
        {matchPassError && (
          <p className="error-msg-auth">Passwords do not match</p>
        )}
        {fillError && (
          <p className="error-msg-auth"> Please fill all the fields </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button onClick={handleSubmit} className="w-[100%]">
          Register
        </Button>

        <div className="flex flex-row justify-center items-center my-4">
          <hr className="w-24 md:w-36 lg:w-64 h-[2px] md:h-[3px] mx-auto my-4 bg-slate-800 border-0 rounded md:my-10" />
          <span className="mx-6"> or </span>
          <hr className="w-24 md:w-36 lg:w-64 h-[2px] md:h-[3px] mx-auto my-4 bg-slate-800 border-0 rounded md:my-10" />
        </div>

        <Button className="w-[100%]" onClick={signupGoogle}>
          <p className="flex items-center gap-3">
            Continue with
            <img className="w-6" src={gmail} alt="github_icon" />
          </p>
        </Button>
        {notLoggedIn && (
          <div className="mt-6 py-2 px-6 rounded-lg bg-red-400 border-4 border-red-500 font-semibold">
            <p> An error occured, try with a different Email Address </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
