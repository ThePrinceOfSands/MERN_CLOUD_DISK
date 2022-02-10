import Router from "express";

import { auth } from "../middlewares/auth";
import FileController from "../controller/FileController";

const router = Router();

router.post("/createFile", auth, FileController.createDir);
router.post("/upload", auth, FileController.uploadFiles);
router.get("", auth, FileController.getFiles);
router.get("/download", auth, FileController.downloadFile);

export default router;
