"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log(data);
    console.log(result);

    if (result?.error) {
      toast({
        title: "Login Failed",
        description:
          result.error === "CredentialsSignin"
            ? "Incorrect username or password"
            : result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "User login successfully",
        variant: "default",
      });
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center  mt-20">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-3xl mb-6">
            Login
          </h1>
          <h4 className="text-xl font-extrabold tracking-tight lg:text-xl mb-6">
            Welcome Back
          </h4>
          <p className="mb-4">the next gen business marketplace</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} placeholder="Enter" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} placeholder="Enter" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Dont &apos; t Have Account{" "}
            <Link
              href="/register"
              className="text-black font-bold hover:underline"
            >
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
