/* eslint-disable @typescript-eslint/no-empty-object-type */
import { type ClientUploadedFileData } from "uploadthing/types";

export type UploadThingEndpoint = "poster" | "avatar";
export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}
