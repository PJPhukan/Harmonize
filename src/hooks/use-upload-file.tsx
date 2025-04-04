import * as React from "react";
import type { UploadedFile } from "@/types";
import { toast } from "sonner";
import type { AnyFileRoute, UploadFilesOptions } from "uploadthing/types";

import { uploadFiles } from "@/lib/uploadthing";
import { OurFileRouter } from "@/app/api/(upload)/uploadthing/core";
import { getErrorMessage } from "@/lib/handle-error";

interface UseUploadFileOptions<TFileRoute extends AnyFileRoute> extends Pick<UploadFilesOptions<TFileRoute>, "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"> {
  defaultUploadedFiles?: UploadedFile[];
}

export function useUploadFile(endpoint: keyof OurFileRouter, { defaultUploadedFiles = [], ...props }: UseUploadFileOptions<OurFileRouter[keyof OurFileRouter]> = {}) {
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = React.useState(false);

  async function onUpload(files: File[]) {
    setIsUploading(true);
    try {
      const res = await uploadFiles(endpoint, {
        ...props,
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => {
            return {
              ...prev,
              [file.name]: progress,
            };
          });
        },
      });

      setUploadedFiles((prev) => (prev ? [...prev, ...res] : res));
      return res; // Return the uploaded files
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    onUpload,
    uploadedFiles,
    progresses,
    isUploading,
  };
}
