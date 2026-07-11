import prisma from "../../../prisma";


const getAllAdminDB = async() =>{
     const result = await prisma.admin.findMany();
}



export const AdminService = {
    getAllAdminDB
}