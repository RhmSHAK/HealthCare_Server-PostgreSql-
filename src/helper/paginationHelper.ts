type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
};

type IPaginationResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
};


const calculatePagination =(paginationOptions: IPaginationOptions): IPaginationResult => {

    const page: number = Number(paginationOptions.page) || 1;
    const limit: number = Number(paginationOptions.limit) || 10;

    const skip: number = (Number(page) - 1) * limit;

    const sortBy: string = paginationOptions.sortBy || "createdAt";
    const sortOrder: string = paginationOptions.sortOrder || "desc";

 return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
 }
};

export const paginationHelper = {
    calculatePagination
};
