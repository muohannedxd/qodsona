import gmail from "../assets/images/gmail.png";
import { useState } from "react";
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  // handle submission
  function handleSubmit(event) {
    event.preventDefault();
    event.preventDefault();

    const { email, password } = data;
    if (!email || !password) {
      setFillError(true);
      return;
    }

    // If all fields are filled, check for other errors
    if (lengthError || emailError) {
      console.log("errooooooors");
      return;
    }

    console.log(data);

    // Clear the form data
    setEmailError(false);
    setFillError(false);
    setLengthError(false);
    setData({
      email: "",
      password: "",
    });
  }

  return (
    <div className="h-[100vh] flex justify-center lg:px-42">
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
              <Button onClick={handleSubmit} className="w-[100%]">
                {" "}
                Login{" "}
              </Button>

              <div className="flex flex-row justify-center items-center my-4">
                <hr className="w-48 h-[2px] mx-auto my-4 bg-slate-800 border-0 rounded md:my-10" />
                <span className="mx-6"> or </span>
                <hr className="w-48 h-[2px] mx-auto my-4 bg-slate-800 border-0 rounded md:my-10" />
              </div>

              <Button className="w-[100%]">
                <p className="flex items-center gap-3">
                  Continue with
                  <img className="w-6" src={gmail} alt="github_icon" />
                </p>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
