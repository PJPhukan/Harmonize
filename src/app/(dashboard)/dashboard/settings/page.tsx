"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Asterisk, Link as LinkIcon, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateAvatar from "@/components/UpdateAvatar";
import UpdateProfileInformation from "@/components/UpdateProfileInformation";
import UpdatePassword from "@/components/UpdatePassword";
import UpdateSkill from "@/components/UpdateSkills";
import UpdateGenre from "@/components/UpdateGenres";
import UpdateSocialLinks from "@/components/UpdateSocialLinks";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { User } from "@/types/user.types";
import axios from "axios";
import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState("account");
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const tabs = [
    { id: "account", label: "Account" },
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy" },
    { id: "updates", label: "Updates" },
    { id: "delete", label: "Delete account" },
  ];

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
  const NotificationSchema = z.object({
    new_connection: z.boolean().default(false).optional(),
    connection_accept: z.boolean(),
    like: z.boolean(),
    post: z.boolean(),
    update: z.boolean(),
  });

  const form = useForm<z.infer<typeof NotificationSchema>>({
    resolver: zodResolver(NotificationSchema),
    defaultValues: {
      new_connection: true,
    },
  });

  function onSubmit(data: z.infer<typeof NotificationSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log("Notification Data :", data);
  }

  const PrivacySchema = z.object({
    share: z.boolean(),
    visibility: z.boolean(),
    location: z.boolean(),
    ads: z.boolean(),
  });
  const formPrivacy = useForm<z.infer<typeof PrivacySchema>>({
    resolver: zodResolver(PrivacySchema),
    defaultValues: {
      share: true,
      visibility: true,
      location: true,
      ads: true,
    },
  });

  function onPrivacySubmit(data: z.infer<typeof NotificationSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log("Privacy Data :", data);
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleDate = (InputDate: Date) => {
    const date = new Date(InputDate);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  function formatIsoDate(isoDateStr: string | Date): string {
    const date = new Date(isoDateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return date.toLocaleString("en-US", options).replace(",", " at");
  }

  const deleteAccount = async () => {
    try {
      if (
        window.confirm(
          "Are you sure you want to delete your account? This action cannot be undone."
        )
      ) {
        console.log("Account deleted");
        toast({
          title: "Account Deleted",
          description: "Your account has been successfully deleted.",
        });
      }
    } catch (error) {}
  };
  return (
    <>
      {isLoading && <Loader type="bar" size="lg" />}

      {user && !isLoading && (
        <div className="h-screen bg-white text-black relative ">
          <h2 className="hidden md:block text-base md:text-xl font-bold mb:mb-4 p-3 sticky top-16 md:top-0 left-0 bg-white z-50 h-auto md:h-[60px] md:ml-48">
            Settings &gt;
            <span className="text-gray-500 text-sm md:text-base">
              {" "}
              {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
            </span>
            <hr className="mt-5" />
          </h2>
          <div className="flex flex-col md:flex-row ">
            <aside className="hide-scrollbar w-[100vw] py-2 md:pt-0 overflow-x-scroll md:w-48 px-3 flex md:block sticky top-16 self-start md:h-[calc(100vh-60px)] bg-white z-50 ">
              <nav className="flex md:block gap-1 mt-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`block w-full text-left px-2 py-2 rounded font-medium text-nowrap ${
                      selectedTab === tab.id
                        ? "bg-gray-200 text-blue-900"
                        : "bg-gray-100 md:bg-transparent md:hover:bg-gray-100"
                    }`}
                    type="button"
                    onClick={() => setSelectedTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </aside>

            <main className="flex-1 px-2 md:px-6 overflow-y-auto z-20 mt-16 md:mt-0">
              {/* Account Panel */}
              {selectedTab === "account" && (
                <div>
                  <h3 className="text-lg font-semibold mb-6">My Profile</h3>
                  <div className="border rounded-lg overflow-auto px-2 md:px-7 py-2 md:py-3 flex w-full justify-between mb-5">
                    <div className="flex gap-2 items-center">
                      <Avatar className="h-10 w-10 md:h-16 md:w-16">
                        <AvatarImage
                          src={user?.avatar}
                          alt={user?.name.charAt(0)}
                        />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div>
                        <h5 className="font-semibold text-lg">{user?.name}</h5>
                        <h5 className="font-light text-sm">{user?.bio}</h5>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="text-blue-900 bg-transparent hover:bg-transparent">
                          <PencilIcon />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <UpdateAvatar user={user} />
                    </Dialog>
                  </div>
                  <div className="border rounded-lg overflow-auto px-2 md:px-7 py-2  w-full  mb-5">
                    <div className="flex justify-between w-full mb-4">
                      <h5 className="font-semibold text-lg">
                        Personal Information
                      </h5>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="text-blue-900 bg-transparent hover:bg-transparent">
                            <PencilIcon />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <UpdateProfileInformation user={user} />
                      </Dialog>
                    </div>
                    <div className="grid grid-cols-2 justify-start gap-4">
                      <div className="flex flex-col gap-2 text-base">
                        <p className="text-black/50 text-sm">Full Name</p>
                        <p className="text-black/60 font-medium">
                          {user?.name}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 text-base">
                        <p className="text-black/50 text-sm">Email Addess</p>
                        <p className="text-black/60 font-medium">
                          {user?.email}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 text-base">
                        <p className="text-black/50 text-sm">Address</p>
                        <p className="text-black/60 font-medium">
                          {user?.location}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 text-base">
                        <p className="text-black/50 text-sm">Date of Birth</p>
                        <p className="text-black/60 font-medium">
                          {handleDate(user.dob)}
                        </p>
                      </div>
                      <div className="col-span-2 text-base">
                        <p className="text-black/50 text-sm">Bio</p>
                        <p className="text-black/60 font-medium">{user.bio}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-auto px-2 md:px-7 py-2 w-full  mb-5">
                    <div className="flex justify-between w-full mb-4">
                      <h5 className="font-semibold text-lg">Manage Password</h5>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="text-blue-900 bg-transparent hover:bg-transparent">
                            <PencilIcon />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <UpdatePassword user={user} />
                      </Dialog>
                    </div>
                    <div className="flex justify-start gap-4 items-center">
                      <p className="text-black/50 text-sm">Profile Password</p>
                      <p className="text-black/60 font-medium flex">
                        {[...Array(8)].map((_, index) => (
                          <Asterisk key={index} className="w-4 h-4" />
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-auto px-2 md:px-7 py-2 w-full  mb-5">
                    <div className="flex justify-between w-full mb-4">
                      <h5 className="font-semibold text-lg">Your Skills</h5>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="text-blue-900 bg-transparent hover:bg-transparent">
                            <PencilIcon />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <UpdateSkill user={user} />
                      </Dialog>
                    </div>
                    <div className="flex flex-1 flex-wrap justify-start gap-2">
                      {user.skill &&
                        user.skill.map((skill) => (
                          <p
                            key={skill}
                            className="text-black/60 text-sm font-medium border md:border-2 shadow-none px-3 py-1 md:py-2 text-nowrap rounded-md md:rounded-lg"
                          >
                            {skill}
                          </p>
                        ))}
                      {user.skill.length < 1 && (
                        <p className="text-left ">
                          Your Skills Information not found !
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-auto px-2 md:px-7 py-2 w-full  mb-5">
                    <div className="flex justify-between w-full mb-4">
                      <h5 className="font-semibold text-lg">Your Genres</h5>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="text-blue-900 bg-transparent hover:bg-transparent">
                            <PencilIcon />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <UpdateGenre user={user} />
                      </Dialog>
                    </div>
                    <div className="flex flex-1 flex-wrap justify-start gap-2">
                      {user.genres &&
                        user.genres.map((genre) => (
                          <p
                            key={genre}
                            className="text-black/60 text-sm font-medium border md:border-2 shadow-none px-3 py-1 md:py-2 text-nowrap rounded-md md:rounded-lg"
                          >
                            {genre}
                          </p>
                        ))}
                      {user.genres.length < 1 && (
                        <p className="text-left ">
                          Your Genres Information not found !
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-auto px-2 md:px-7 py-2 w-full  mb-5">
                    <div className="flex justify-between w-full mb-4">
                      <h5 className="font-semibold text-lg">Social Profiles</h5>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="text-blue-900 bg-transparent hover:bg-transparent">
                            <PencilIcon />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <UpdateSocialLinks user={user} />
                      </Dialog>
                    </div>
                    <div className="grid grid-cols-1 justify-start gap-2">
                      {user.spotify && (
                        <Link
                          href={
                            user.spotify.startsWith("http")
                              ? user.spotify
                              : `https://${user.spotify}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black/60 font-medium border px-3 py-2 rounded-lg flex gap-2 items-center"
                        >
                          {user.spotify}
                          <LinkIcon className="w-4 h-4" />
                        </Link>
                      )}
                      {user.youtube && (
                        <Link
                          href={
                            user.youtube.startsWith("http")
                              ? user.youtube
                              : `https://${user.youtube}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black/60 font-medium border px-3 py-2 rounded-lg flex gap-2 items-center"
                        >
                          {user.youtube}
                          <LinkIcon className="w-4 h-4" />
                        </Link>
                      )}
                      {user.website && (
                        <Link
                          href={
                            user.website.startsWith("http")
                              ? user.website
                              : `https://${user.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black/60 font-medium border px-3 py-2 rounded-lg flex gap-2 items-center"
                        >
                          {user.website}
                          <LinkIcon className="w-4 h-4" />
                        </Link>
                      )}
                      {user.otherLink &&
                        user.otherLink.map((link) => (
                          <Link
                            key={link}
                            href={
                              link.startsWith("http") ? link : `https://${link}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black/60 font-medium border px-3 py-2 rounded-lg flex gap-2 items-center"
                          >
                            {link}
                            <LinkIcon className="w-4 h-4" />
                          </Link>
                        ))}

                      {!user.spotify &&
                        !user.website &&
                        !user.youtube &&
                        user.otherLink.length < 1 && (
                          <p className="text-left ">
                            Your Genres Information not found !
                          </p>
                        )}
                    </div>
                  </div>
                  <p className="text-center mb-3 text-sm">
                    On {formatIsoDate(user.createdAt)}, the universe welcomed a
                    new digital legend—you!
                  </p>
                  <Footer />
                </div>
              )}

              {/* notification Panel  */}
              {selectedTab === "notifications" && (
                <div>
                  <h3 className="text-lg font-semibold mb-6">Notifications</h3>
                  <div className=" py-3 flex w-full justify-between gap-5 flex-col">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6"
                      >
                        <div>
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="new_connection"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg bg-black/5 p-3 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-black/70  font-medium">
                                      Get email notification for new connection
                                      Requests
                                    </FormLabel>
                                    <FormDescription className="text-black/50 text-sm">
                                      Notify me whenever a new Request is
                                      published in my Changelog
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="connection_accept"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg bg-black/5 p-3 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-black/70  font-medium">
                                      Get email notification when Connection
                                      Request accept
                                    </FormLabel>
                                    <FormDescription className="text-black/50 text-sm">
                                      Notify me whenever Connection Request
                                      accept is published in my Changelog
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="like"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg bg-black/5 p-3 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-black/70  font-medium">
                                      Get email notification for new Likes
                                    </FormLabel>
                                    <FormDescription className="text-black/50 text-sm">
                                      Notify me whenever a new Like is published
                                      in my Changelog
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="post"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg bg-black/5 p-3 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-black/70  font-medium">
                                      Get email notification when Connected
                                      People Posts
                                    </FormLabel>
                                    <FormDescription className="text-black/50 text-sm">
                                      Notify me whenever Connected People Post
                                      is published in my Changelog
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="update"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg bg-black/5 p-3 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-black/70  font-medium">
                                      Enable In-App Notifications
                                    </FormLabel>
                                    <FormDescription className="text-black/50 text-sm">
                                      Stay updated in real-time! Receive instant
                                      in-app notifications for important
                                      updates, messages, and activity related to
                                      your connections
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="bg-blue-600 px-5 hover:bg-blue-400"
                        >
                          Save
                        </Button>
                      </form>
                    </Form>
                  </div>
                  <Footer />
                </div>
              )}

              {/* Privacy pannel  */}
              {selectedTab === "privacy" && (
                <div>
                  <h3 className="text-lg font-semibold mb-6">
                    Privacy Settings
                  </h3>
                  <div className=" py-3 flex w-full justify-between gap-5 flex-col">
                    <Form {...formPrivacy}>
                      <form
                        onSubmit={form.handleSubmit(onPrivacySubmit)}
                        className="w-full space-y-6"
                      >
                        <div>
                          <div className="space-y-4">
                            <FormField
                              control={formPrivacy.control}
                              name="share"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg bg-black/5 p-3 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-black/70  font-medium">
                                      Data Sharing
                                    </FormLabel>
                                    <FormDescription className="text-black/50 text-sm">
                                      Allow app usage data to improve features
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={formPrivacy.control}
                              name="visibility"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg bg-black/5 p-3 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-black/70  font-medium">
                                      Profile Visibility
                                    </FormLabel>
                                    <FormDescription className="text-black/50 text-sm">
                                      Show my profile in search results
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={formPrivacy.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg bg-black/5 p-3 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-black/70  font-medium">
                                      Location Tracking
                                    </FormLabel>
                                    <FormDescription className="text-black/50 text-sm">
                                      Allow location tracking for personalized
                                      recommendations
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={formPrivacy.control}
                              name="ads"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg bg-black/5 p-3 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-black/70  font-medium">
                                      Ad Personalization
                                    </FormLabel>
                                    <FormDescription className="text-black/50 text-sm">
                                      Use my data to personalized ads
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="bg-blue-600 px-5 hover:bg-blue-400"
                        >
                          Save
                        </Button>
                      </form>
                    </Form>
                  </div>
                  <Footer />
                </div>
              )}

              {/* Update Panel */}
              {selectedTab === "updates" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Update Account</h3>
                  <p className="text-black/60 mb-4">
                    Keep your account information up to date.
                  </p>
                  <Button className="bg-blue-600 px-5 hover:bg-blue-400 mb-6">
                    Update Account Details
                  </Button>
                  <Footer />
                </div>
              )}

              {/* Delete Account Panel */}
              {selectedTab === "delete" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-600">
                    Delete Account
                  </h3>
                  <p className="text-black/60 mb-4">
                    Deleting your account is permanent and cannot be undone. All
                    your data will be lost.
                  </p>
                  <Button
                    className="bg-red-600 px-5 hover:bg-red-400 mb-6"
                    onClick={deleteAccount}
                  >
                    Delete My Account
                  </Button>
                  <Footer />
                </div>
              )}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPage;
