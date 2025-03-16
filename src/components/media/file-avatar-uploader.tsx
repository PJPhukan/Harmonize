"use client";

import * as React from "react";
import Image from "next/image";
import { Camera, FileText } from "lucide-react";
import { toast } from "sonner";

import { cn, formatBytes } from "@/lib/utils";
import { useControllableState } from "@/hooks/use-controllable-state";
import { Button } from "@/components/ui/button";
import profile from "@/assets/userAvatar.jpg";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { setupSchema } from "@/schemas/user.Schema";

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: File[];
  onValueChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  progresses?: Record<string, number>;
  accept?: string;
  maxSize?: number;
  maxFileCount?: number;
  multiple?: boolean;
  disabled?: boolean;
}

export function AvatarUploader(props: FileUploaderProps) {
  const { control, watch } = useFormContext<z.infer<typeof setupSchema>>();
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = "image/*",
    maxSize = 1024 * 1024 * 50, // 2MB
    maxFileCount = 1,
    multiple = false,
    disabled = false,
    className,
    ...rest
  } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const acceptedFiles: File[] = [];
    const rejectedFiles: File[] = [];

    selectedFiles.forEach((file) => {
      if (file.size > maxSize) {
        rejectedFiles.push(file);
      } else {
        acceptedFiles.push(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    });

    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach((file) =>
        toast.error(`File ${file.name} exceeds size limit`)
      );
    }

    const updatedFiles = multiple
      ? [...(files || []), ...acceptedFiles]
      : acceptedFiles.slice(0, maxFileCount);

    if (updatedFiles.length > maxFileCount) {
      toast.error(`Cannot upload more than ${maxFileCount} files`);
      return;
    }

    setFiles(updatedFiles);

    if (onUpload) {
      const target =
        updatedFiles.length > 1 ? `${updatedFiles.length} files` : "file";

      toast.promise(onUpload(updatedFiles), {
        loading: `Uploading ${target}...`,
        success: () => {
          setFiles([]);
          return `${target} uploaded successfully`;
        },
        error: `Failed to upload ${target}`,
      });
    }
  };

  const onRemove = (index: number) => {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);
  };

  React.useEffect(() => {
    return () => {
      files?.forEach((file: any) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const isDisabled = disabled || (files?.length ?? 0) >= maxFileCount;

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      <div className="h-32 w-32 mr-4 relative bg-gray-100 rounded-full">
        <Image
          src={
            files && files.length > 0 ? URL.createObjectURL(files[0]) : profile
          }
          width={128}
          height={128}
          alt=""
          className="h-full w-full z-10 rounded-full"
        ></Image>
        <label
          htmlFor="avatar"
          className="z-20 text-xl rounded-full absolute  bottom-1.5 right-1 h-[35px] w-[35px]"
        >
          <Camera
            className="z-20 text-xl text-white p-1 rounded-full bg-gray-500 "
            height={30}
            width={30}
          />
          <span className="hidden">Avatar</span>
        </label>

        <input
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={isDisabled}
          className="hidden"
          onChange={handleFileChange}
          {...rest}
          id="avatar"
        />
      </div>
          
    </div>
  );
}

interface FileCardProps {
  file: File;
  onRemove: () => void;
  //   progress?: number;
}

function isFileWithPreview(file: File): file is File & { preview: string } {
  return "preview" in file && typeof file.preview === "string";
}

interface FilePreviewProps {
  file: File & { preview: string };
}

function FilePreview({ file }: FilePreviewProps) {
  if (file.type.startsWith("image/")) {
    return (
      <Image
        src={file.preview}
        alt={file.name}
        width={48}
        height={48}
        loading="lazy"
        className="aspect-square shrink-0 rounded-md object-cover"
      />
    );
  }

  return (
    <FileText className="size-10 text-muted-foreground" aria-hidden="true" />
  );
}
