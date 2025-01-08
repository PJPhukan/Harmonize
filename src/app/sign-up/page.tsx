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
import { SignUpSchema } from "@/schemas/user.Schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
const Page = () => {
  const [isSubmittingForm, setisSubmittingForm] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      day: "",
      month: "",
      year: "",
    },
  });



  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: "01", name: "January" },
    { value: "02", name: "February" },
    { value: "03", name: "March" },
    { value: "04", name: "April" },
    { value: "05", name: "May" },
    { value: "06", name: "June" },
    { value: "07", name: "July" },
    { value: "08", name: "August" },
    { value: "09", name: "September" },
    { value: "10", name: "October" },
    { value: "11", name: "November" },
    { value: "12", name: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    console.log("Data submitted :", data);
    setisSubmittingForm(true);
    try {
      const response = await axios.post(`/api/sign-up`, data);
      console.log("Response", response);
      toast({
        title: "Success",
        description: response.data.message,
      });
      if (response.data.success) {
        router.replace(`/verify-user/${data.email}`);
      } else {
        setErrMsg(response.data.message);
        setTimeout(() => {
          setErrMsg("");
        }, 1000);
      }

   
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
              <h1 className="text-2xl font-bold  text-black">
                Create an Account
              </h1>
              <p className="text-md font-bold mb-4 sm:mb-6 text-gray-400 font-custom">
                Be a part of the music community
              </p>
            </div>
            {errMsg && <p className="text-red-400">{errMsg}</p>}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" w-full text-black"
              >
                {/* name  */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" mt-1 block text-sm font-medium text-gray-700">
                        Name
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
                <div className="mt-1">
                  <p className="block text-sm font-medium text-gray-700">
                    Birthday
                  </p>
                  <div className="flex space-x-2 w-full">
                    {/* Date  */}
                    <FormField
                      control={form.control}
                      name="day"
                      render={({ field }) => (
                        <FormItem className="w-1/3 bg-slate-200 h-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Day" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {days.map((day) => (
                                <SelectItem
                                  key={day}
                                  value={String(day).padStart(2, "0")}
                                >
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Month  */}

                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <FormItem className="w-1/3 bg-slate-200 h-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {months.map((month) => (
                                <SelectItem
                                  key={month.value}
                                  value={month.value}
                                >
                                  {month.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem className="w-1/3 bg-slate-200 h-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={String(year)}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Year */}
                  </div>
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
                    " Sign up"
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
              Have an account?{" "}
              <Link href="/login" className="text-indigo-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
