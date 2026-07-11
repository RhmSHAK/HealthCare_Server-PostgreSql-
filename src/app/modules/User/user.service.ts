import { UserRole } from "../../../generated/prisma/enums";
import prisma from "../../../prisma";

import bcrypt from "bcrypt";

const createAdmin = async (data: any) => {
  // console.log({data});

  //hash the password
  const hashedPassword: String = await bcrypt.hash(data.password, 10);
    console.log(hashedPassword)

  const userData={
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN
  }


  const result = await prisma.$transaction(async (transactionClient: any) => {
    
    const createdUserData = await transactionClient.user.create({
      data: userData
    });

    const createdAdminData = await transactionClient.admin.create({
      data: data.admin
    });

    return createdAdminData;

  })
  return result;
}

export const UserService = {
  createAdmin
}