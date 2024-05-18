import { Router } from "express";
import { postUpdateUserDocuments, putUserRole } from "../controllers/users.controller.js";
import { upload } from "../config/multer.config.js";

const userRouter = Router();

userRouter.put("/premium/:uid", putUserRole);

userRouter.post("/:uid/documents", upload.array('documents'), postUpdateUserDocuments)

export default userRouter;
