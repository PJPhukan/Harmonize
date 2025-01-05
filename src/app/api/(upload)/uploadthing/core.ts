import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  post: f({
    image: {
      maxFileSize: "64MB",
      maxFileCount: 1
    },
    audio: {
      maxFileSize: "64MB",
      maxFileCount: 1
    },
    video: {
      maxFileSize: "1024MB",
      maxFileCount: 1
    }
  }).onUploadComplete(() => { }),
  avatar: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } }).onUploadComplete(() => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
