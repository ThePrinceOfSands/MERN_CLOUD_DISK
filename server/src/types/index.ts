import type { Types, Date } from "mongoose";
import type { UploadedFile } from "express-fileupload";
export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar: string;
  files: Types.ObjectId[];
}

export interface IFile {
  _id: Types.ObjectId;
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  date: Date;
  user: Types.ObjectId;
  parent: Types.ObjectId;
  childs: Types.ObjectId[];
}

export type TFileRequest = Pick<IFile, "name" | "type" | "parent">;
