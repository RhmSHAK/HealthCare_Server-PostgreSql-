import { Request, Response } from "express";
import { UserService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
    try{
         //console.log(req.body);
     const result = await UserService.createAdmin(req.body);
     res.status(200).json({
        status: "success",
        message: "Admin created successfully",
        data: result
     })

    }
    catch(error){
       // console.log(error);
        res.status(500).json({
            status: "error",
            message: error?.name || "Something went wrong",
            error: error
        });
    }
}

export const UserController = {
    createAdmin
}