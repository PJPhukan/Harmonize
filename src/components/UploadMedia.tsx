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
import dummyImg from "@/assets/architecture.jpg";
import { toast } from "@/hooks/use-toast";
import { setupSchema, SignInSchema } from "@/schemas/user.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Camera, Loader2, X } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Profile from "@/assets/architecture.jpg";
import Image from "next/image";
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
import { FileUploader } from "./media/file-uploader";
import { uploadSchema } from "@/schemas/post.Schema";
const UploadMedia = ({ newPost }: { newPost: boolean }) => {
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
    },
  });
  const { progresses, uploadedFiles, isUploading, onUpload } = useUploadFile(
    "post",
    { defaultUploadedFiles: [] }
  );
  const onSubmit = (data: z.infer<typeof uploadSchema>) => {
    console.log("Submit form", data);
    // console.log(form.formState.errors);
    setIsSubmittingForm(true);
    console.log("Other data:", data);
    SonnerToast.promise(
      onUpload(data.post).then(async (dt) => {
        console.log("DATA : ", data);
        if (data && dt && dt[0]?.url) {
          data.postURL = dt[0].url;
        }
        // const response = await axios.post(
        //   `/api/setup-profile/${params.userId}`,
        //   data
        // );
        // if (response.data.status) {
        //   toast({
        //     title: "Success",
        //     description: response.data.message,
        //   });
        //   router.replace(`/user`);
        // }
        setIsSubmittingForm(false);
      }),
      {
        loading: "Uploading images...",
        success: () => {
          form.reset();
          setIsSubmittingForm(false);
          return "Images uploaded";
        },
        // error: (err: any) => {
        //   setIsSubmittingForm(false);
        //   setErrorMsg(err);
        //   //   return getErrorMessage(err);
        // },
      }
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {!newPost ? (
            <div className="flex items-center " >
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <Image
                  src={dummyImg}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <p className="bg-gray-100 h-10 w-full mx-2 flex items-center px-3 rounded-lg">
                What's cooking?
              </p>
            </div>
          ) : (
            "Get Started"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex gap-3">
            <Image
              src={dummyImg}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h2 className="font-semibold text-gray-700 flex items-center text-nowrap">
              Parag jy phukan
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
                    <FormLabel className="mt-1 block text-sm font-medium text-gray-700">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={2}
                        placeholder="Describe yourself in a few words"
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
                      <FormLabel className="text-base md:text-xl font-medium">
                        Poster
                      </FormLabel>
                      <FormControl>
                        <FileUploader
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
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <div className="space-y-6">
                    <FormItem className="w-full">
                      <FormLabel className="text-base md:text-xl font-medium">
                        Poster
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Describe yourself in a few words"
                          {...field}
                          className=" bg-slate-200 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadMedia;
