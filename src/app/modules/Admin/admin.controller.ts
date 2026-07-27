import  { Request, Response }  from "express";


import { AdminService } from "./admin.service";
import pick from "../../../share/pick";



const getAllAdminDB = async (req: Request , res: Response) => {
   
    try{
        console.log(req.query);   

    const filters = pick(req.query, ["searchTerm", "name", "email", "role"]);  
    const result = await AdminService.getAllAdminDB(filters);
    // console.log(result)

    res.status(200).json({
        status: "success",
        message: "Admins retrieved successfully",
        data: result
    });
    }
    catch(error){
        res.status(500).json({
            status: "error",
            message: error?.name || "Something went wrong",
            error: error
        });
    }
}


export const AdminController = {
    getAllAdminDB
}