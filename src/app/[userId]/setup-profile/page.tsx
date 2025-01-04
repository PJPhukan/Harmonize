"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { setupSchema, SignInSchema } from "@/schemas/user.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Camera, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Profile from "@/assets/architecture.jpg";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
const page = () => {
  const [isSubmittingForm, setisSubmittingForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof setupSchema>>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      name: "",
      location: "",
      bio: "",
      avatar: "",
      website: "",
      youtube: "",
      spotify: "",
      instragram: "",
      twitter: "",
      linkdin: "",
      discord: "",
    },
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  //add skill
  const addSkill = (e: any) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Prevent form submission on Enter
      const input = e.currentTarget;
      const newSkill = input.value.trim();
      if (newSkill && !skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      input.value = ""; // Clear the input field
    }
  };

  //delete skill
  const deleteSkill = (index: number) => {
    const newSkills = skills?.filter((skill, i) => i !== index);
    setSkills(newSkills);
  };

  //add genres
  const addGenre = (e: any) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Prevent form submission on Enter
      const input = e.currentTarget;
      const newGenre = input.value.trim();
      if (newGenre && !genres.includes(newGenre)) {
        setGenres([...genres, newGenre]);
      }
      input.value = ""; // Clear the input field
    }
  };

  //delete skill
  const deleteGenres = (index: number) => {
    const newGenres = genres?.filter((genre, i) => i !== index);
    setGenres(newGenres);
  };

  const onSubmit = async (data: z.infer<typeof setupSchema>) => {
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
    <div className="bg-auth-bg bg-cover bg-start min-h-screen text-white  flex justify-center flex-col items-center bg-opacity-50">
      {/* <div className="flex items-center justify-center  px-1 sm:px-2 md:px-4"> */}
      <div className=" md:w-1/3 bg-white rounded-lg shadow-xl m-2 md:m-12 p-6 sm:p-8 w-full ">
        <h1 className="text-2xl font-bold  text-black">Set-up Profile</h1>

        {errorMsg && (
          <p className="text-red-500 text-center mb-2">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-green-500 text-center mb-2">{successMsg}</p>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full text-black flex flex-col gap-2"
          >
            <div className="flex items-center mb-4">
              <div className="h-32 w-32 mr-4 relative ">
                <Image
                  src={Profile}
                  alt=""
                  className="h-full w-full z-10 rounded-full"
                ></Image>
                <label htmlFor="avatar">
                  <Camera
                    className="z-20 text-xl text-white p-1 rounded-full bg-gray-500 absolute bottom-1.5 right-1"
                    height={30}
                    width={30}
                  />
                  <span className="hidden">Avatar</span>
                </label>
                <input type="file" id="avatar" className="hidden" />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mt-1 block text-sm font-medium text-gray-700">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className=" bg-slate-200 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                      <FormLabel className="mt-1 block text-sm font-medium text-gray-700">
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your location"
                          {...field}
                          className=" bg-slate-200 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-1 block text-sm font-medium text-gray-700">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Describe yourself in a few words"
                      {...field}
                      className=" bg-slate-200 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* skills  */}
            <div>
              <p className="block text-md md:text-xl font-medium">Skills</p>
              <p className="text-sm mb-1">
                Press enter or add a comma after each skill
              </p>
              <div className="flex flex-wrap gap-2 border px-1 py-2 rounded-md bg-slate-200">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-sm flex gap-1 items-center"
                  >
                    <span>{skill}</span>
                    <X
                      onClick={() => deleteSkill(index)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
                <label htmlFor="skill" className="hidden">
                  Skill
                </label>
                <input
                  type="text"
                  placeholder=" + Add Skill"
                  id="skill"
                  className="bg-white  px-3 py-1 text-black rounded-full text-sm focus:outline-none"
                  onKeyDown={addSkill}
                />
              </div>
              <p className="text-sm">At least one skill must be added</p>
            </div>
            {/* Genre  */}
            <div>
              <p className="block text-md md:text-xl font-medium">Genres</p>
              <p className="text-sm mb-1">
                Press enter or add a comma after each genre
              </p>
              <div className="flex flex-wrap gap-2 border px-1 py-2 rounded-md bg-slate-200">
                {genres.map((genre, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-sm flex gap-1 items-center"
                  >
                    <span>{genre}</span>
                    <X
                      onClick={() => deleteGenres(index)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
                <label htmlFor="genre" className="hidden">
                  Genre
                </label>
                <input
                  type="text"
                  placeholder="+ Add Genre"
                  id="genre"
                  className="bg-white  px-3 py-1 text-black rounded-full text-sm focus:outline-none"
                  onKeyDown={addGenre}
                />
              </div>
              <p className="text-sm">At least one genre must be added</p>
            </div>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-md md:text-xl font-medium">
                    Website
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Link to your website"
                      {...field}
                      className=" bg-slate-200 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Youtube url */}
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-md md:text-xl font-medium">
                    Youtube
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Youtube URL"
                      {...field}
                      className=" bg-slate-200 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* spotify url */}
            <FormField
              control={form.control}
              name="spotify"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-md md:text-xl font-medium">
                    Spotify
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Spotify URL"
                      {...field}
                      className=" bg-slate-200 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col justify-start gap-1">
              <p className="block text-md md:text-xl font-medium">
                Other Links and Socials
              </p>
              {/* instragram url */}
              <FormField
                control={form.control}
                name="instragram"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="block text-md md:text-xl font-medium">
                      Instagram
                    </FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Instragram URL"
                        {...field}
                        className=" bg-slate-200 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Twitter url */}
              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="block text-md md:text-xl font-medium">
                      Twitter
                    </FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Twitter URL"
                        {...field}
                        className=" bg-slate-200 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Linkdin url */}
              <FormField
                control={form.control}
                name="linkdin"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="block text-md md:text-xl font-medium">
                      Linkdin
                    </FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Linkdin URL"
                        {...field}
                        className=" bg-slate-200 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Discord url */}
              <FormField
                control={form.control}
                name="discord"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="block text-md md:text-xl font-medium">
                      Discord
                    </FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Discord URL"
                        {...field}
                        className=" bg-slate-200 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmittingForm}
                className="mt-4  text-white py-2 rounded-full font-medium  transition"
              >
                {isSubmittingForm ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  " Procced"
                )}
              </Button>
            </div>
          </form>
        </Form>

        {/* <div className="mt-6 flex items-center justify-between">
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
            </p> */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default page;
