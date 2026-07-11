import  { Request, Response }  from "express";
import { AdminService } from "./admin.service";


const getAllAdminDB = async (req: Request , res: Response) => {
   
    const result = await AdminService.getAllAdminDB();

    res.status(200).json({
        status: "success",
        message: "Admins retrieved successfully",
        data: result
    });
}


export const AdminController = {
    getAllAdminDB
}