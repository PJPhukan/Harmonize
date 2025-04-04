"use client";

import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast as SonnerToast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useUploadFile } from "@/hooks/use-upload-file";
import { AvatarUploader } from "./media/file-avatar-uploader";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { UpdateAvatarSchema } from "@/schemas/user.Schema";
import { getErrorMessage } from "@/lib/handle-error";
import { User } from "@/types/user.types";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const UpdateAvatar = ({ user }: { user: User }) => {
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const router = useRouter();
  const form = useForm<z.infer<typeof UpdateAvatarSchema>>({
    resolver: zodResolver(UpdateAvatarSchema),
    defaultValues: {
      avatar: [],
      avatarURL: "",
    },
  });

  const onSubmit = (data: z.infer<typeof UpdateAvatarSchema>) => {
    setIsSubmittingForm(true);
    SonnerToast.promise(
      onUpload(data.avatar).then(async (dt: any) => {
        if (data && dt && dt[0]?.url) {
          data.avatarURL = dt[0].url;
        }
        const response = await axios.post(`/api/update/avatar`, data);
        if (response.data.status) {
          toast({
            title: "Success",
            description: response.data.message,
          });
          router.replace(`/dashboard/settings`);
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
        error: (err: any) => {
          setIsSubmittingForm(false);
          return getErrorMessage(err);
        },
      }
    );
  };
  const { progresses, isUploading, onUpload } = useUploadFile("avatar", {
    defaultUploadedFiles: [],
  });
  return (
    <DialogContent className="sm:max-w-[425px] px-3">
      <DialogHeader>
        <DialogTitle>Update your Profile Picture </DialogTitle>
        <DialogDescription>
          Update your profile picture. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form
            method="post"
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full text-black flex flex-col justify-end"
          >
            <div className="flex justify-center flex-col items-center mb-4">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="w-full flex items-center justify-center flex-col">
                    <FormControl>
                      <AvatarUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFileCount={1}
                        maxSize={4 * 1024 * 1024}
                        progresses={progresses}
                        disabled={isUploading || isSubmittingForm}
                        url={user.avatar ? user.avatar : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="font-light text-sm text-center">{user.bio}</p>
            </div>
            <div className="flex w-full justify-center">
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

export default UpdateAvatar;
