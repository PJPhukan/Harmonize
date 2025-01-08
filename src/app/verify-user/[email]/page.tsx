"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { verifySchema } from "@/schemas/user.Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import Navber from "@/components/Navber";
const page = () => {
  const [isSubmittingForm, setisSubmittingForm] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams<{ email: string }>();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setisSubmittingForm(true);
    try {
      const response = await axios.post(`/api/verify-code`, {
        email: params?.email,
        code: data.code,
      });
      toast({
        title: "Success",
        description: response.data.message,
      });
      if (response.data.success) {
        // router.replace("/login");
        router.replace(`/${response.data.data._id}/setup-profile`);
      } else {
        setErrMsg(response.data.message);
        setTimeout(() => {
          setErrMsg("");
        }, 1000);
      }
    } catch (err) {
      //write catch block
      console.log("Print sign up error", err);
      toast({
        title: "Error",
        description: "Failed to verify user",
        variant: "destructive",
      });
    } finally {
      setisSubmittingForm(false);
    }
  };
  return (
    <>
      <Navber />
      <div className="bg-auth-bg bg-cover  bg-start min-h-screen text-black  flex justify-center flex-col items-center bg-opacity-50">
        <div className="flex items-center justify-center  px-1 sm:px-2 md:px-4">
          <div className="bg-white rounded-lg shadow-xl m-2 md:m-12 p-6 sm:p-8 w-full max-w-md">
            <div className="text-center">
              <h1 className="text-2xl font-bold  text-black">
              Verify your account
              </h1>
              {/* <p className="text-md font-bold mb-4 sm:mb-6 text-gray-400 font-custom">
                Be a part of the music community
              </p> */}
            </div>
            {errMsg && <p className="text-red-400">{errMsg}</p>}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 px-4"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-6">
                  <Button
                    type="submit"
                    disabled={isSubmittingForm}
                    className="w-1/2 flex items-center justify-center relative translate-x-1/2 mt-5"
                  >
                    {isSubmittingForm ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Please wait...
                      </>
                    ) : (
                      " Verify"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

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
    </>
  );
};

export default page;
