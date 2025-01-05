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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Profile from "@/assets/architecture.jpg";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { AvatarUploader } from "@/components/media/file-avatar-uploader";
import { useUploadFile } from "@/hooks/use-upload-file";
import { toast as SonnerToast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
const page = () => {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof setupSchema>>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      name: "",
      location: "",
      bio: "",
      avatar: [],
      avatarURL: "",
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

  const { progresses, uploadedFiles, isUploading, onUpload } = useUploadFile(
    "avatar",
    { defaultUploadedFiles: [] }
  );
  useEffect(() => {
    console.log(form.getValues());
    // console.log("Skills ", skills);
    // console.log("G ", genres);
  }, [form.watch()]);

  useEffect(() => {
    form.setValue("genres", genres);
  }, [genres]);

  useEffect(() => {
    form.setValue("skills", skills);
  }, [skills]);

  const onSubmit = (data: z.infer<typeof setupSchema>) => {
    console.log("Submit form", data);
    // console.log(form.formState.errors);
    // setIsSubmittingForm(true);
    // console.log("Other data:", data);
    // SonnerToast.promise(
    //   onUpload(data.avatar).then(async (dt) => {
    //     console.log("DATA : ", data);
    //     if (data && dt && dt[0]?.url) {
    //       data.avatarURL = dt[0].url;
    //     }
    //     // const response = await axios.post(`/api/c-event`, data);
    //     // toast({
    //     //   title: "Success",
    //     //   description: response.data.message,
    //     // });
    //     setIsSubmittingForm(false);
    //     // router.replace(`/user/me`);
    //   }),
    //   {
    //     loading: "Uploading images...",
    //     success: () => {
    //       form.reset();
    //       setIsSubmittingForm(false);
    //       return "Images uploaded";
    //     },
    //     error: (err: any) => {
    //       setIsSubmittingForm(false);
    //       return getErrorMessage(err);
    //     },
    //   }
    // );
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
            method="post"
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full text-black flex flex-col gap-2"
          >
            <div className="flex items-center mb-4">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <div className="space-y-6">
                    <FormItem className="w-full">
                      <FormLabel className="text-base md:text-xl font-medium hidden">
                        Avatar
                      </FormLabel>
                      <FormControl>
                        <AvatarUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFileCount={1}
                          maxSize={4 * 1024 * 1024}
                          progresses={progresses}
                          // pass the onUpload function here for direct upload
                          //   onUpload={onUpload}
                          disabled={isUploading || isSubmittingForm}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    {/* {uploadedFiles.length > 0 ? (
                  <UploadedFilesCard uploadedFiles={uploadedFiles} />
                ) : null} */}
                  </div>
                )}
              />
              {/* <AvatarUploader /> */}
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
                // disabled={isSubmittingForm}
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
      </div>
    </div>
  );
};

export default page;
