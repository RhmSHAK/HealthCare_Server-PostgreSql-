import { Prisma } from "../../../generated/prisma/client";
import prisma from "../../../prisma";
import { adminSearchFields } from "./admin.constant";


const getAllAdminDB = async(params: any, paginationOptions: any) =>{
    // console.log({params})
     const { page, limit, sortBy, sortOrder } = paginationOptions;
    const { searchTerm, ...filterData } = params;

     const andConditions: Prisma.AdminWhereInput[] = [];
     

     //console.log(filterData);

     if(params.searchTerm){
        andConditions.push(
            {
             OR: adminSearchFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,    
                    mode: "insensitive"
                }
             }))
        })
     }

     //specific field filtering
    if(Object.keys(filterData).length>0){
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                    mode: "insensitive"
                }
            }))
        })
    }

     const whereCondition: Prisma.AdminWhereInput = { AND: andConditions };

     const result = await prisma.admin.findMany(
        //search functionality
        {
        where: whereCondition,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
          
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" }


        // orderBy: {
        //    // createdAt: "asc"
        //    //[sortBy]: sortOrder
        // }
     }
    );

     return result;
}



export const AdminService = {
    getAllAdminDB
}