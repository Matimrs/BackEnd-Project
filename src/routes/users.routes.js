import { Router } from "express";
import {
  deleteAllInactiveUsers,
  deleteOneUser,
  getUsers,
  postUpdateUserDocuments,
  putUserRole,
} from "../controllers/users.controller.js";
import { upload } from "../config/multer.config.js";

const userRouter = Router();

userRouter.put("/premium/:uid", putUserRole);

userRouter.post(
  "/:uid/documents",
  upload.array("documents"),
  postUpdateUserDocuments
);

userRouter.get("/", getUsers);

userRouter.delete("/", deleteAllInactiveUsers);

userRouter.delete("/:id", deleteOneUser);

export default userRouter;
