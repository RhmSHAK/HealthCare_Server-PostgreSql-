import  { Request, Response }  from "express";


import { AdminService } from "./admin.service";
import pick from "../../../share/pick";
import { adminFilterableFields } from "./admin.constant";



const getAllAdminDB = async (req: Request , res: Response) => {
   
    try{
        console.log(req.query);   

    const filters = pick(req.query, adminFilterableFields);

    const paginationOptions = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);  
    //console.log(paginationOptions)
    
    const result = await AdminService.getAllAdminDB(filters, paginationOptions);
    // console.log(result)

    res.status(200).json({
        status: "success",
        message: "Admins retrieved successfully",
        meta: result.meta,
        data: result.data
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

const getByIdFromDB = async (req: Request , res: Response) => {
    try{
        const { id } = req.params;
        const result = await AdminService.getByIdFromDB(id);

        res.status(200).json({
            status: "success",
            message: "Admin get by id retrieved successfully",
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

const updateIntoDB = async (req: Request , res: Response) => {

     const { id } = req.params;
    //  console.log("id:", id);
    //  console.log("Data:", req.body);

     try{
       
        const result = await AdminService.updateIntoDB(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Admin Data Updated successfully",
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

const deleteFromDB = async (req: Request , res: Response) => {

    const { id } = req.params;
    
     try{
       
        const result = await AdminService.deleteFromDB(id);

        res.status(200).json({
            status: "success",
            message: "Admin Data deleted successfully",
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

const softDeleteFromDB = async (req: Request , res: Response) => {

    const { id } = req.params;
    
     try{
       
        const result = await AdminService.softDeleteFromDB(id);

        res.status(200).json({
            status: "success",
            message: "Admin Data Soft Deleted successfully",
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
    getAllAdminDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB
}