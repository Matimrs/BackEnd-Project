import { Router } from "express";
import { putUserRole } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.put("/premium/:uid", putUserRole);

export default userRouter;
