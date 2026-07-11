import  express from "express";
import { AdminController } from "./admin.controller";



const router = express.Router();

router.get("/", AdminController.getAllAdminDB);




export const adminRouter = router;