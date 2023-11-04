import gmail from "../assets/images/gmail.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "@/components/Signup";
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
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth, db } from "@/config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const googleAuthProvider = new GoogleAuthProvider();

export default function Login() {
  // form data
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // error control
  const [lengthError, setLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [fillError, setFillError] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false)

  // regex validator for email
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  // handling form filling
  function handleChange(event) {
    const { name, value } = event.target;
    if (name == "email" && !validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    // handle password ontime errors
    if (name == "password" && value.length > 0 && value.length < 8) {
      setLengthError(true);
    } else {
      setLengthError(false);
    }

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  const navigate = useNavigate();

  // handle submission
  async function handleSubmit(event) {
    event.preventDefault();

    const { email, password } = data;
    if (!email || !password) {
      setFillError(true);
      return;
    }

    // If all fields are filled, check for other errors
    if (lengthError || emailError) {
      console.log("could not log in");
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setNotLoggedIn(true)
      console.error(error);
      return
    }
    
    // Clear the form data
    setEmailError(false);
    setFillError(false);
    setLengthError(false);
    setData({
      email: "",
      password: "",
    });

    navigate("/search");
    window.location.reload();
  }

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


  // signing up with google
  const loginGoogle = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleAuthProvider)
      const user = userCredentials.user
      const exists = await getUser(user.email);
      if (!exists) {
        await createUser("Full Name", user.email, "+213555000000");
      }
      localStorage.setItem('token', user.accessToken)
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      setNotLoggedIn(true)
      console.error(error)
      return
    }

    navigate("/search");
    window.location.reload();

  }

  return (
    <div className="pb-24 flex justify-center lg:px-42">
      <Tabs
        defaultValue="signup"
        className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-[800px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription className="text-black font-medium">
                Welcome back, thank you for your efforts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="abuubaida@gmail.com"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  name="password"
                  value={data.password}
                  type="password"
                  id="username"
                  placeholder="at least 8 characters"
                  onChange={handleChange}
                />
              </div>
              {lengthError && (
                <p className="error-msg-auth">
                  Password must be 8 characters at least
                </p>
              )}
              {fillError && (
                <p className="error-msg-auth"> Please fill all the fields </p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button onClick={handleSubmit} className="w-[100%] bg-slate-900">
                {" "}
                Login{" "}
              </Button>

              <div className="flex flex-row justify-center items-center my-4">
              <hr className="w-24 md:w-36 lg:w-64 h-[2px] md:h-[3px] mx-auto my-4 bg-slate-800 border-0 rounded md:my-10" />
                <span className="mx-6"> or </span>
                <hr className="w-24 md:w-36 lg:w-64 h-[2px] md:h-[3px] mx-auto my-4 bg-slate-800 border-0 rounded md:my-10" />
              </div>

              <Button className="w-[100%] bg-slate-900" onClick={loginGoogle}>
                <p className="flex items-center gap-3">
                  Continue with
                  <img className="w-6" src={gmail} alt="github_icon" />
                </p>
              </Button>
              {notLoggedIn && 
              <div className="mt-6 py-2 px-6 rounded-lg bg-red-400 border-4 border-red-500 font-semibold">
                <p> Invalid Email or Password </p>
              </div>
              }
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
