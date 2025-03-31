"use client";

import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdatePasswordSchema } from "@/schemas/user.Schema";
import { toast } from "@/hooks/use-toast";

import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const UpdatePassword = () => {
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConPassword, setShowConPassword] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdatePasswordSchema>) => {
    try {
      setIsSubmittingForm(true);
      const response = await axios.post("/api/update/password"); //TODO: Connect with backend
      if (response.data.status) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        router.replace(`/dashboard/settings`);
      }
    } catch (error) {
      console.log("ERROR [UPDATE PASSWORD ] ", error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Update your Password </DialogTitle>
        <DialogDescription>
          Update your password. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form
            method="post"
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full text-black flex flex-col justify-end"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-1 block font-light text-sm text-gray-700">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Current Password"
                      {...field}
                      type="password"
                      className="font-semibold text-lg bg-gray-100 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2 block font-light text-sm text-gray-700">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Current Password"
                        {...field}
                        type={showNewPassword ? "text" : "password"}
                        className="font-semibold text-lg bg-gray-100 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {!showNewPassword ? (
                        <Eye
                          className="absolute right-3 top-0 translate-y-[50%] text-gray-500 cursor-pointer w-4 h-4"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        />
                      ) : (
                        <EyeOff
                          className="absolute right-3 top-0 translate-y-[50%] text-gray-500 cursor-pointer w-4 h-4"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2 block font-light text-sm text-gray-700">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Confirm Password"
                        {...field}
                        type={showConPassword ? "text" : "password"}
                        className="font-semibold text-lg bg-gray-100 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {!showConPassword ? (
                        <Eye
                          className="absolute right-3 top-0 translate-y-[50%] text-gray-500 cursor-pointer w-4 h-4"
                          onClick={() => setShowConPassword(!showConPassword)}
                        />
                      ) : (
                        <EyeOff
                          className="absolute right-3 top-0 translate-y-[50%] text-gray-500 cursor-pointer w-4 h-4"
                          onClick={() => setShowConPassword(!showConPassword)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-center mt-4">
              <Button
                type="submit"
                className=" text-white py-2 rounded-full font-medium  transition"
              >
                {isSubmittingForm ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  " Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default UpdatePassword;
