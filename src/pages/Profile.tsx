import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/config/firebase";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export default function Profile() {
  const { isLoggedIn, user } = useAuth();
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  if (isLoggedIn && user) {
    var currentEmail = user.email;
  }

  useEffect(() => {
    if (isLoggedIn && user) {
      const fetchUser = async () => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", currentEmail));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          // Assuming there's only one user with the given email
          querySnapshot.forEach((doc) => {
            setCurrentUser(doc.data());
          });
        }
      };

      fetchUser();
    }
  }, [isLoggedIn, user]);

  const [nameError, setNameError] = useState(false);
  const [fillError, setFillError] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  // to validate the full name
  const validateFullName = (name) => {
    const fullNameRegex = /^[a-zA-Z\s]+$/i;
    return fullNameRegex.test(name);
  };
  // handling form filling
  function handleChange(event) {
    const { name, value } = event.target;
    if (name == "name" && !validateFullName(value)) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    setCurrentUser((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  // submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, phone } = currentUser;
    if (!name || !email || !phone) {
      setFillError(true);
      return;
    }

    // If all fields are filled, check for other errors
    if (nameError || fillError) {
      setNotLoggedIn(true);
      return;
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", currentEmail));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      // Assuming there's only one user with the given email
      querySnapshot.forEach(async (doc) => {
        // Delete the document with the specified email
        await deleteDoc(doc.ref);
        await setDoc(doc.ref, {
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
        });
        console.log('updated')
      });
    }

    // Clear the form data
    setNameError(false);
    setFillError(false);
    setCurrentUser({
      name: "",
      email: "",
      phone: "",
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="py-12 flex flex-col items-center">
      <Tabs
        defaultValue="account"
        className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-[800px]"
      >
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1 flex flex-col md:flex-row items-start md:items-center md:gap-4 justify-between pb-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  defaultValue={currentUser.name}
                  onChange={handleChange}
                />
              </div>
              {nameError && (
                <p className="error-msg-auth ml-12">
                  Enter your real valid name
                </p>
              )}
              <div className="space-y-1 flex flex-col md:flex-row items-start md:items-center md:gap-4 justify-between pb-3">
                <Label htmlFor="username">Email</Label>
                <Input
                  name="email"
                  disabled
                  id="username"
                  defaultValue={currentEmail}
                />
              </div>
              <div className="space-y-1 flex flex-col md:flex-row items-start md:items-center md:gap-4 justify-between pb-3">
                <Label htmlFor="username">Phone</Label>
                <Input
                  name="phone"
                  type="number"
                  id="username"
                  defaultValue={currentUser.phone}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <div className="flex justify-between">
              <CardFooter>
                <Button
                  onClick={logout}
                  className="bg-gray-400 bg-opacity-75 text-black hover:text-white"
                >
                  {" "}
                  Logout{" "}
                </Button>
              </CardFooter>
              <CardFooter>
                <Button onClick={handleSubmit} className=" bg-slate-900"> Save changes </Button>
              </CardFooter>
            </div>
            {notLoggedIn && (
              <div className="my-6 py-2 w-[80%] md:w-[70%] lg:w-[50%] mx-auto px-6 rounded-lg bg-red-400 border-4 border-red-500 font-semibold text-center">
                <p> An error occured </p>
                <p> Could not update your information</p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
