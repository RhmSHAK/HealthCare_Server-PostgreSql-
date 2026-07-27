import { Prisma } from "../../../generated/prisma/client";
import prisma from "../../../prisma";


const getAllAdminDB = async(params: any) =>{
    // console.log({params})

    const { searchTerm, ...filterData } = params;

     const andConditions: Prisma.AdminWhereInput[] = [];
     const adminSearchFields = ["name", "email"];

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
        where: whereCondition 
     }
    );

     return result;
}



export const AdminService = {
    getAllAdminDB
}