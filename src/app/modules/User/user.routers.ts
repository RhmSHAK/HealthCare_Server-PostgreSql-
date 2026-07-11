import  Express  from "express";
import { UserController } from "./user.controller";

const router = Express.Router();

router.post("/", UserController.createAdmin);

export const UserRouter = router;