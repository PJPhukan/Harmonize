"use client";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { UpdateProfileInfoSchema } from "@/schemas/user.Schema";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { User } from "@/types/user.types";

const UpdateProfileInformation = ({ user }: { user: User }) => {
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const router = useRouter();
  const form = useForm<z.infer<typeof UpdateProfileInfoSchema>>({
    resolver: zodResolver(UpdateProfileInfoSchema),
    defaultValues: {
      name: user.name,
      location: user.location || "",
      bio: user.bio || "",
      day: user.dob ? new Date(user.dob).getDate().toString() : "",
      month: user.dob
        ? (new Date(user.dob).getMonth() + 1).toString().padStart(2, "0")
        : "",
      year: user.dob ? new Date(user.dob).getFullYear().toString() : "",
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

  const onSubmit = async (data: z.infer<typeof UpdateProfileInfoSchema>) => {
    try {
      setIsSubmittingForm(true);
      const response = await axios.post("/api/update/profile-info", data); //TODO: Connect with backend
      if (response.data.status) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        router.replace(`/dashboard/settings`);
      }
    } catch (error) {
      console.log("ERROR [UPDATE PROFILE INFORMATION ] ", error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Update your Profile Information </DialogTitle>
        <DialogDescription>
          Update your profile information. Click save when you're done.
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-1 block font-light text-sm text-gray-700">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Name"
                      {...field}
                      className="font-semibold text-lg bg-gray-100 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-1 block tfont-light text-sm text-gray-700">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Location"
                      {...field}
                      className="font-semibold text-lg bg-gray-100 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-1">
              <p className="block font-light text-sm text-gray-700">Birthday</p>
              <div className="flex space-x-2 w-full">
                {/* Date  */}
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem className="w-1/3 bg-gray-100 h-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Day"
                              className="font-semibold text-lg"
                            />
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
                    <FormItem className="w-1/3 bg-gray-100 h-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Month"
                              className="font-semibold text-lg"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
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
                    <FormItem className="w-1/3 bg-gray-100 h-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Year"
                              className="font-semibold text-lg"
                            />
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
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-1 block font-light text-sm text-gray-700">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your location"
                      {...field}
                      className="font-semibold text-lg bg-gray-100 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-center mt-2">
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

export default UpdateProfileInformation;
