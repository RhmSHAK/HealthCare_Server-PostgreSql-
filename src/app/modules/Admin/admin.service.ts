import { Admin, Prisma, UserStatus } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../prisma";
import { adminSearchFields } from "./admin.constant";



const getAllAdminDB = async(params: any, paginationOptions: any) =>{
    // console.log({params})
    const { page, limit,skip, sortBy, sortOrder } = paginationHelper.calculatePagination(paginationOptions);
    const { searchTerm, ...filterData } = params;
    console.log(searchTerm)

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
     };

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
    };

    andConditions.push({
           isDeleted: false
        //isDeleted: true
    })

     const whereCondition: Prisma.AdminWhereInput = { AND: andConditions };

     const result = await prisma.admin.findMany(
        //search functionality
        {
        where: whereCondition,
        skip,
        take: limit,
          
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" }


        // orderBy: {
        //    // createdAt: "asc"
        //    //[sortBy]: sortOrder
        // }
     });

     const total = await prisma.admin.count({ where: whereCondition });


     return {
        meta: {
            page,
            limit,
            total
        },
        data: result
     };
}


const getByIdFromDB = async (id: string): Promise<Admin | null> => {
    const result = await prisma.admin.findUnique({
        where: {
            id: id,
            isDeleted: false
        }
    });

    return result;
};

const updateIntoDB = async (id: string, data: Partial<Admin>): Promise<Admin | null> => {

    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });

    const result = await prisma.admin.update({
        where: {
             id
        },
        data
    });

    return result;
}

const deleteFromDB = async (id: string): Promise<Admin | null> => {
    //console.log("delete data")

    await prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    });

    const result = await prisma.$transaction(async (TransactionClient) => {
 
            const adminDeleteData = await TransactionClient.admin.delete({
                where: {
                    id
                }
            });

    //user data delete--------------------------------------      
           await TransactionClient.user.delete({
                where: {
                     email: adminDeleteData.email
                }
            });

            return adminDeleteData;
    });

    return result;
}

const softDeleteFromDB = async (id: string): Promise<Admin | null> => {
    //console.log("delete data")

    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });

    const result = await prisma.$transaction(async (TransactionClient) => {
 
            const adminDeleteData = await TransactionClient.admin.update({
                where: {
                    id
                },
                data: {
                    isDeleted: true
                }
            });
          
         //user data delete--------------------------------------   
            await TransactionClient.user.update({
                where: {
                     email: adminDeleteData.email
                },
                data: {
                    status: UserStatus.DELETED
                }
            });

            return adminDeleteData;
    });

    return result;
}

export const AdminService = {
    getAllAdminDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB
}