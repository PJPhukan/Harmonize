"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dummyImg from "@/assets/architecture.jpg";
import {
  AudioWaveform,
  Edit,
  Edit2,
  Music2,
  Play,
  PlayIcon,
  UserRound,
  Users,
} from "lucide-react";
import Link from "next/link";
import ShowAudioTrack from "@/components/ShowAudioTrack";
import UserActivity from "@/components/UserActivity";
import UserPost from "@/components/UserPost";
import UserTrack from "@/components/UserTrack";
import UserVideo from "@/components/UserVideo";
import UploadMedia from "@/components/UploadMedia";
// import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import dummyImg from "@/assets/architecture.jpg";
import { toast } from "@/hooks/use-toast";
import { setupSchema, SignInSchema } from "@/schemas/user.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Camera, Loader2, X } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Profile from "@/assets/architecture.jpg";
// import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { AvatarUploader } from "@/components/media/file-avatar-uploader";
import { useUploadFile } from "@/hooks/use-upload-file";
import { toast as SonnerToast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { uploadSchema } from "@/schemas/post.Schema";
import { FileUploader } from "@/components/media/file-uploader";
import { User } from "@/types/user.types";
import { Post } from "@/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { socialMedia } from "@/data";
import FindMeOnItem from "@/components/FindMeOnItem";
const page = () => {
  const [activity, setActivity] = useState(true);
  const [tracks, setTracks] = useState(false);
  const [post, setPost] = useState(false);
  const [video, setVideo] = useState(false);

  const handleActivity = (s: string) => {
    if (s === "activity") {
      setActivity(true);
      setPost(false);
      setTracks(false);
      setVideo(false);
    } else if (s === "post") {
      setActivity(false);
      setPost(true);
      setTracks(false);
      setVideo(false);
    } else if (s === "tracks") {
      setActivity(false);
      setPost(false);
      setTracks(true);
      setVideo(false);
    }
    if (s === "video") {
      setActivity(false);
      setPost(false);
      setTracks(false);
      setVideo(true);
    }
  };

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
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
  const { progresses, uploadedFiles, isUploading, onUpload } = useUploadFile(
    "post",
    { defaultUploadedFiles: [] }
  );

  const onSubmit = (data: z.infer<typeof uploadSchema>) => {
    // console.log("Submit form", data);
    setIsSubmittingForm(true);
    // console.log("Other data:", data.post);
    SonnerToast.promise(
      onUpload(data.post).then(async (dt) => {
        console.log("DATA : ", data);
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

  useEffect(() => {
    getUserDetails();
    getTotalConnections();
    getTotalTracks();
    getUserPosts();
  }, []);

  //get user details from the user

  const [user, setUser] = useState<User>();
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/get-user");
      // console.log("Response", response);
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error occured while fetching user details", error);
      setErrorMsg("Internal server error");
    }
  };

  //get total connections
  const [totalConnections, setTotalConnections] = useState<number>(0);
  const getTotalConnections = async () => {
    try {
      const response = await axios.get("/api/get-all-connections");
      // console.log("Connection Response", response);
      if (response.data.success) {
        setTotalConnections(response.data.data.totalConnections);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error occured while fetching total connections", error);
      setErrorMsg("Internal server error");
    }
  };

  //get total tracks
  const [totalTracks, setTotalTracks] = useState<number>(0);
  const getTotalTracks = async () => {
    try {
      const response = await axios.get("/api/get-all-tracks");
      console.log("Tracks Response", response);
      if (response.data.success) {
        setTotalTracks(response.data.data.totalTracks);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error occured while fetching total tracks", error);
      setErrorMsg("Internal server error");
    }
  };

  //fetch user all post
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const getUserPosts = async () => {
    try {
      const response = await axios.get("/api/me-post");
      console.log("Posts Response", response);
      if (response.data.success) {
        setUserPosts(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error occured while fetching user posts", error);
      setErrorMsg("Internal server error");
    }
  };

  const mediaDetails = [
    {
      label: "Connections",
      icon: UserRound,
      total: totalConnections,
    },
    {
      label: "Audio Track",
      icon: Music2,
      total: totalTracks,
    },
    {
      label: "User Played",
      icon: PlayIcon,
      total: 980,
    },
  ];

  const customLoader = ({ src }: { src: string }) => src;
  const isUser = true;
  return (
    user && (
      <div className="flex-1 px-3 md:px-5 py-1 w-full md:w-[73vw] mt-20 md:mt-0 mb-[80px] overflow-x-hidden ">
        {/* profile  */}
        <div className="bg-gray-200 rounded-md mt-3 overflow-hidden min-h-[10rem] ">
          <div className="flex justify-between items-center gap-3 flex-col md:flex-row p-3 mt-[2rem] md:mt-[5rem]">
            <div className="flex flex-col  md:flex-row gap-3 items-center">
              <div className="flex flex-col gap-3 items-center">
                <Avatar className="w-20 h-20 md:w-40 md:h-40 ">
                  <AvatarImage src={user?.avatar} alt="Profile" />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Link
                  href="/dashboard/me/edit"
                  className="flex gap-1 bg-gray-600 text-white px-3 py-1.5 rounded-full "
                >
                  <Edit2 width={20} />
                  <span className="text-nowrap text-sm">Edit Profile</span>
                </Link>
              </div>

              {/* details  */}
              <div className="flex flex-col gap-1 items-center md:items-start">
                <p className="text-2xl font-bold">{user.name}</p>
                {/* skills */}
                <div className="w-full mt-2">
                  <div className="flex gap-1.5 items-center md:items-start">
                    {user.skill.length > 0 &&
                      user.skill.map((sk, i) => (
                        <span
                          key={sk}
                          className=" text-sm px-3 bg-white py-1 rounded-full "
                        >
                          {sk}
                        </span>
                      ))}
                  </div>
                </div>
                {/* gonre */}
                <div className="w-full mt-1">
                  <div className="flex gap-1.5 ">
                    {user.genres.length > 0 &&
                      user.genres.map((gn, i) => (
                        <span
                          key={i}
                          className="text-sm px-3 bg-white py-1 rounded-full "
                        >
                          {gn}
                        </span>
                      ))}
                  </div>
                </div>
                <p className="text-sm">{user.bio}</p>
              </div>
            </div>

            {/* connection  */}
            <div className="flex gap-2 md:gap-3 items-center mt-3 md:mt-0 md:mr-3  w-full md:w-1/2 justify-center md:justify-end">
              {mediaDetails.map((media) => (
                <div
                  key={media.label}
                  className="flex flex-col justify-center items-center font-extrabold w-1/3 md:w-1/4 bg-white rounded-md  h-20 md:h-28 relative shadow-md inset-2"
                >
                  <p className="text-3xl md:text-5xl number-font">
                    {media.total > 999
                      ? `${(media.total / 1000).toFixed(1)}K`
                      : media.total}
                  </p>
                  <p className="">{media.label}</p>
                  <span className="absolute w-full h-full opacity-10 flex justify-center items-center">
                    <media.icon className="w-full h-full"/>
                  </span>
                </div>
              ))}
            </div>

            {/* user social media links  */}

            <div className="flex md:hidden aspect-auto gap-1">
              {user.spotify && (
                <FindMeOnItem
                  data={{
                    url: "/social/spotify.png",
                    label: "Spotify",
                  }}
                  link={user.spotify}
                />
              )}
              {user.website && (
                <FindMeOnItem
                  data={{
                    url: "/social/website.png",
                    label: "Website",
                  }}
                  link={user.website}
                />
              )}
              {user.youtube && (
                <FindMeOnItem
                  data={{
                    url: "/social/youtube.png",
                    label: "Youtube",
                  }}
                  link={user.youtube}
                />
              )}
              {user.otherLink.map((link) => {
                const matchedMedia = socialMedia.find((media) =>
                  link.includes(media.label.toLowerCase())
                );
                return matchedMedia ? (
                  <FindMeOnItem key={link} data={matchedMedia} link={link} />
                ) : null;
              })}
            </div>
          </div>
        </div>
        {/* navber */}
        <p className="h-1 border-b mt-4 w-full " />
        {userPosts && (
          <div className="flex">
            <div className="mt-2 md:w-2/3 ">
              <ul className="flex gap-2 md:gap-6 justify-center">
                <li
                  className={`text-gray-600 py-2 cursor-pointer ${
                    activity ? "font-semibold" : ""
                  }`}
                  onClick={() => handleActivity("activity")}
                >
                  Activity
                </li>
                <li
                  className={`text-gray-600 py-2 cursor-pointer ${
                    tracks ? "font-semibold" : ""
                  }`}
                  onClick={() => handleActivity("tracks")}
                >
                  Tracks
                </li>
                <li
                  className={`text-gray-600 py-2 cursor-pointer ${
                    post ? "font-semibold" : ""
                  }`}
                  onClick={() => handleActivity("post")}
                >
                  Posts
                </li>
                <li
                  className={`text-gray-600 py-2 cursor-pointer ${
                    video ? "font-semibold" : ""
                  }`}
                  onClick={() => handleActivity("video")}
                >
                  Videos
                </li>
              </ul>

              <div className="mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full border-none hover:bg-transparent bg-transparent shadow-none">
                      <div className="flex items-center justify-between  w-full">
                        <Avatar>
                          <AvatarImage src={user?.avatar} alt="@shadcn" />
                          <AvatarFallback>
                            {user?.name.charAt(0)}
                          </AvatarFallback>
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
                        <Image
                          loader={customLoader}
                          src={user.avatar ? user.avatar : dummyImg}
                          alt="profile"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <h2 className="font-semibold text-gray-700 flex items-center text-nowrap">
                          {user.name}
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
                              // disabled={isSubmittingForm}
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

                {activity && (
                  <UserActivity
                    activityData={userPosts}
                    name={user.name}
                    isUser={isUser}
                    avatar={user.avatar}
                  />
                )}
                {post && (
                  <UserPost
                    postData={userPosts}
                    name={user.name}
                    isUser={isUser}
                    avatar={user.avatar}
                  />
                )}
                {tracks && (
                  <UserTrack
                    trackData={userPosts}
                    name={user.name}
                    isUser={isUser}
                    avatar={user.avatar}
                  />
                )}
                {video && (
                  <UserVideo
                    videoData={userPosts}
                    name={user.name}
                    isUser={isUser}
                    avatar={user.avatar}
                  />
                )}

                {!userPosts && (
                  <div className="mt-10 text-center">
                    <p className="text-gray-600">
                      Upload your music so that musicians and artists can
                      connect with you
                    </p>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 text-white px-6 py-2 rounded mt-4 hover:bg-blue-700">
                          Get Started
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Create Post</DialogTitle>
                        </DialogHeader>
                        <div className="w-full relative">
                          <div className="flex gap-3">
                            <Image
                              loader={customLoader}
                              src={user.avatar ? user.avatar : dummyImg}
                              alt="profile"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <h2 className="font-semibold text-gray-700 flex items-center text-nowrap">
                              {user.name}
                            </h2>
                          </div>

                          <Form {...form}>
                            <form
                              method="post"
                              onSubmit={form.handleSubmit(onSubmit)}
                              className=" w-full text-black flex flex-col gap-2"
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
                                          disabled={
                                            isUploading || isSubmittingForm
                                          }
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
                                  // disabled={isSubmittingForm}
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
                  </div>
                )}
              </div>
              {/* Content  */}
            </div>
            <div className="mt-4 w-1/3 md:block hidden justify-center pl-3">
              {/* TODO: Add social media icons */}
              <p className=" pb-3 font-semibold text-xl">Swipe, tap, and connect! 🌍</p>

              <div className="flex flex-col gap-1 items-center ">
                {user.spotify && (
                  <FindMeOnItem
                    data={{
                      url: "/social/spotify.png",
                      label: "Spotify",
                    }}
                    link={user.spotify}
                  />
                )}
                {user.website && (
                  <FindMeOnItem
                    data={{
                      url: "/social/website.png",
                      label: "Website",
                    }}
                    link={user.website}
                  />
                )}
                {user.youtube && (
                  <FindMeOnItem
                    data={{
                      url: "/social/youtube.png",
                      label: "Youtube",
                    }}
                    link={user.youtube}
                  />
                )}
                {user.otherLink.map((link) => {
                  const matchedMedia = socialMedia.find((media) =>
                    link.includes(media.label.toLowerCase())
                  );
                  return matchedMedia ? (
                    <FindMeOnItem key={link} data={matchedMedia} link={link} />
                  ) : null;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default page;
