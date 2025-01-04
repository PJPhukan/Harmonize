"use client";

import React, { useState } from "react";
import Navber from "@/components/Navber";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Loader2,
  SquarePlay,
  SquarePlus,
  WandSparkles,
} from "lucide-react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignInSchema, SignUpSchema } from "@/schemas/user.Schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";

import { toast } from "@/hooks/use-toast";
const Page = () => {
  const [isSubmittingForm, setisSubmittingForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    console.log("Data submitted :", data);
    setisSubmittingForm(true);
    try {
      const response = await axios.post(`/api/sign-in`, data);

      console.log("Response", response);

      if (response.data.success) {
        setSuccessMsg("Successfully user logged in");
        console.log("User successfully signed in ");
        router.replace(`/${response.data.data._id}/setup-profile`);
      } else {
        setErrorMsg(response.data.message);
      }

      setTimeout(() => {
        setErrorMsg("");
        setSuccessMsg("");
      }, 1000);
    } catch (err) {
      console.log("Sign up error", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in",
      });
    } finally {
      setisSubmittingForm(false);
    }
  };
  return (
    <main>
      <Navber />

      <div className="bg-auth-bg bg-cover bg-start min-h-screen text-white  flex justify-center flex-col items-center bg-opacity-50">
        <div className="flex items-center justify-center  px-1 sm:px-2 md:px-4">
          <div className="bg-white rounded-lg shadow-xl m-2 md:m-12 p-6 sm:p-8 w-full max-w-md">
            <div className="text-center">
              <h1 className="text-2xl font-bold  text-black">Login</h1>
              <p className="text-md font-bold mb-4 sm:mb-6 text-gray-400 font-custom">
                WelCome back!
              </p>
            </div>
            {errorMsg && (
              <p className="text-red-500 text-center mb-2">{errorMsg}</p>
            )}
            {successMsg && (
              <p className="text-green-500 text-center mb-2">{successMsg}</p>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full text-black"
              >
                {/* EMAIL  */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mt-1 block text-sm font-medium text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className=" bg-slate-200 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password  */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mt-1 block text-sm font-medium text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          type="password"
                          className=" bg-slate-200 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-center mt-4">
                  <Link
                    href="/forgot-password/send-email"
                    className="text-sm text-indigo-600 font hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmittingForm}
                  className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-full font-medium hover:bg-indigo-600 transition"
                >
                  {isSubmittingForm ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    " Sign In"
                  )}
                </Button>
              </form>
            </Form>
            <div className="mt-6 flex items-center justify-between">
              <span className="border-t flex-grow border-gray-300"></span>
              <span className="text-sm text-gray-500 mx-3">
                or continue with
              </span>
              <span className="border-t flex-grow border-gray-300"></span>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button className="p-2 bg-gray-100 rounded-full">
                <FaGoogle className="text-black" />
                <span className="hidden">Google</span>
              </button>
              <button className="p-2 bg-gray-100 rounded-full">
                <FaFacebook className="text-black" />
                <span className="hidden">Facebook</span>
              </button>
              <button className="p-2 bg-gray-100 rounded-full">
                <FaApple className="text-black" />
                <span className="hidden">Apple</span>
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center">
              By continuing, you agree to Harmonize's{" "}
              <Link href="/terms" className="text-indigo-500 hover:underline">
                Terms of Use
              </Link>
              and
              <Link href="/policy" className="text-indigo-500 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="mt-4 text-center text-sm text-black">
              Don't have an account?
              <Link href="/sign-up" className="text-indigo-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
