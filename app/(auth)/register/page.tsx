"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";

export default function Register() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/register", formData);
      toast({
        title: "Success",
        description: "User Registered Successfully",
      });
      router.push("/");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.log("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="w-full max-w-md shadow-lg p-10 ">
        <h2 className="text-3xl font-bold text-center mb-4">
          Create an Account
        </h2>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full uppercase"
              disabled={loading}
            >
              {loading ? "CREATING..." : "CREATE  ACCOUNT"}
            </Button>

            <p className="text-center text-sm">
              Have a Account?{" "}
              <a
                href="/sign-in"
                className="text-primary uppercase text-black font-bold"
              >
                Login
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
