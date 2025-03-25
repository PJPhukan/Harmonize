"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { toast as SonnerToast } from "sonner";

import { User } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";

import { uploadSchema } from "@/schemas/post.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadFile } from "@/hooks/use-upload-file";
import { toast } from "@/hooks/use-toast";

import SuggestedUser from "@/components/SuggestedUser";
import ShowPost from "@/components/ShowPost";
import ShowAudioTrack from "@/components/ShowAudioTrack";
import ShowVideo from "@/components/ShowVideo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "@/components/media/file-uploader";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/Loader";

const page = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getUserDetails();
    getSuggestedUserPost();
  }, []);

  //get user follow content
  const [Post, setPost] = useState<Post[]>([]);
  const getSuggestedUserPost = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/get-connected-user");
      if (response.data.success) {
        setPost(response.data.data);
      } else {
        setErrorMsg(response.data.message);
      }
    } catch (error) {
      setErrorMsg("Internal server error");
    } finally {
      setIsLoading(false);
    }
  };

  //get user details
  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/get-user");
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        setErrorMsg(response.data.message);
      }
    } catch (error) {
      setErrorMsg("Internal server error");
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      tag: "",
      description: "",
      post: [],
      postURL: "",
      name: "",
      type: "",
    },
  });
  const { progresses, isUploading, onUpload } = useUploadFile("post", {
    defaultUploadedFiles: [],
  });
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof uploadSchema>) => {
    setIsSubmittingForm(true);
    SonnerToast.promise(
      onUpload(data.post).then(async (dt) => {
        if (data && dt && dt[0]?.url) {
          data.postURL = dt[0].url;
          data.type = dt[0].type;
          data.name = dt[0].name;
        }
        const response = await axios.post("/api/me-post", data);
        if (response.data.status) {
          toast({
            title: "Success",
            description: response.data.message,
          });
          router.replace(`/dashboard`);
        }
        setIsSubmittingForm(false);
      }),
      {
        loading: "Uploading images...",
        success: () => {
          form.reset();
          setIsSubmittingForm(false);
          return "Images uploaded";
        },
      }
    );
  };

  return (
    <>
      {isLoading && <Loader type="bar" size="lg" />}
      {!isLoading && <div className="flex ">
        <section className="w-full md:w-[62.5%] mt-6 ">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full border-none hover:bg-transparent bg-transparent shadow-none">
                <div className="flex items-center justify-between  w-full">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt="@shadcn" />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="bg-gray-100 h-10 w-full mx-2 flex items-center px-3 rounded-lg text-black">
                    What's cooking?
                  </p>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Post</DialogTitle>
              </DialogHeader>
              <div className="w-full relative">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-gray-700 flex items-center text-nowrap">
                    {user?.name}
                  </h2>
                </div>

                <Form {...form}>
                  <form
                    method="post"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" w-full text-black flex flex-col gap-2 "
                  >
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-1 block text-sm md:text-xl font-medium text-gray-700">
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={2}
                              placeholder="Write description"
                              {...field}
                              className=" bg-slate-200 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="post"
                      render={({ field }) => (
                        <div className="space-y-6">
                          <FormItem className="w-full">
                            <FormControl>
                              <FileUploader
                                value={field.value}
                                onValueChange={field.onChange}
                                maxFileCount={1}
                                maxSize={4 * 1024 * 1024}
                                progresses={progresses}
                                disabled={isUploading || isSubmittingForm}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tag"
                      render={({ field }) => (
                        <div className="space-y-6">
                          <FormItem className="w-full">
                            <FormLabel className="text-base md:text-lg font-medium">
                              Tag
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Add tag"
                                {...field}
                                className=" bg-slate-200 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="mt-4  text-white py-2 rounded-full font-medium  transition"
                      >
                        {isSubmittingForm ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Please wait...
                          </>
                        ) : (
                          " Post"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          <div className="mt-6">
            {Post &&
              Post.map((pt: any, index: number) => {
                if (pt.type.includes("image")) {
                  return (
                    <ShowPost
                      key={index}
                      post={pt}
                      name={pt.ownerDetails.name}
                      isUser={false}
                      isConnected={true}
                      avatar={pt.ownerDetails.avatar}
                    />
                  );
                } else if (pt.type.includes("audio")) {
                  return (
                    <ShowAudioTrack
                      key={index}
                      audio={pt}
                      name={pt.ownerDetails.name}
                      isUser={false}
                      isConnected={true}
                      avatar={pt.ownerDetails.avatar}
                    />
                  );
                } else {
                  return (
                    <ShowVideo
                      key={index}
                      video={pt}
                      name={pt.ownerDetails.name}
                      isUser={false}
                      isConnected={true}
                      avatar={pt.ownerDetails.avatar}
                    />
                  );
                }
              })}
          </div>
        </section>
        <div className="w-full hidden md:block md:w-[24rem] bg-white border-t lg:border-t-0 lg:border-l border-gray-200 h-screen sticky top-0 right-0">
          <SuggestedUser />
        </div>
      </div>}
    </>
  );
};

export default page;
