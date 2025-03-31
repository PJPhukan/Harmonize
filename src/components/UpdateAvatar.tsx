"use client";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useState } from "react";
import { AvatarUploader } from "./media/file-avatar-uploader";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateAvatarSchema } from "@/schemas/user.Schema";
import { z } from "zod";
import { toast as SonnerToast } from "sonner";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/handle-error";
import { useUploadFile } from "@/hooks/use-upload-file";

const UpdateAvatar = () => {
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
        const response = await axios.post(`/api/update/avatar`, data); //TODO: Make the route and check wheather its correctly working or not
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
    <DialogContent className="sm:max-w-[425px]">
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="font-semibold text-lg">Parag jyoti phukan</p>
              <p className="font-light text-sm text-center">
                Hi 👋🏻👋🏻... My name is Paragjyoti Phukan. I am a Bachelor of
                Science in Information Technology Student ,and also I am
                beginner of a Full Stack Web Developer.
              </p>
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
