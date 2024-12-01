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
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState<z.ZodError | null>(null);
  const [signupErrors, setSignupErrors] = useState<z.ZodError | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = loginSchema.parse(loginData);
      setLoginErrors(null);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      if (response.ok) {
        console.log("Login successful");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setLoginErrors(error);
        return;
      }
      console.error("Login failed:", error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = signupSchema.parse(signupData);
      setSignupErrors(null);

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      if (response.ok) {
        console.log("Signup successful");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setSignupErrors(error);
        return;
      }
      console.error("Signup failed:", error);
    }
  };

  return (
    <Tabs defaultValue="Login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Login">Login</TabsTrigger>
        <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="Login">
        <Card>
          <CardHeader>
            <CardTitle>Login </CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              {loginErrors?.errors.find(
                (error) => error.path[0] === "email"
              ) && (
                <p className="text-sm text-red-500">
                  {
                    loginErrors.errors.find(
                      (error) => error.path[0] === "email"
                    )?.message
                  }
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              {loginErrors?.errors.find(
                (error) => error.path[0] === "password"
              ) && (
                <p className="text-sm text-red-500">
                  {
                    loginErrors.errors.find(
                      (error) => error.path[0] === "password"
                    )?.message
                  }
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Sign Up">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={signupData.username}
                onChange={(e) =>
                  setSignupData({ ...signupData, username: e.target.value })
                }
              />
              {signupErrors?.errors.find(
                (error) => error.path[0] === "username"
              ) && (
                <p className="text-sm text-red-500">
                  {
                    signupErrors.errors.find(
                      (error) => error.path[0] === "username"
                    )?.message
                  }
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="signupEmail">Email</Label>
              <Input
                id="signupEmail"
                type="email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
              />
              {signupErrors?.errors.find(
                (error) => error.path[0] === "email"
              ) && (
                <p className="text-sm text-red-500">
                  {
                    signupErrors.errors.find(
                      (error) => error.path[0] === "email"
                    )?.message
                  }
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="signupPassword">Password</Label>
              <Input
                id="signupPassword"
                type="password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
              />
              {signupErrors?.errors.find(
                (error) => error.path[0] === "password"
              ) && (
                <p className="text-sm text-red-500">
                  {
                    signupErrors.errors.find(
                      (error) => error.path[0] === "password"
                    )?.message
                  }
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignup}>Sign Up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
