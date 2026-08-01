import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

const createEngineer = async (engineerData) =>  {
    const { name, email, phone, department } = engineerData;

    const existEngineer = await prisma.engineer.findUnique({
        where: {
            email,
        }
    });

    if(existEngineer) {
        throw new ApiError(409, "Engineer with this email already exists");
    }

    const engineer = await prisma.engineer.create({
        data: {
            name,
            email,
            department,
            phone
        }
    });

    return engineer;
}

const getAllEngineers = async () => {

    const engineers = await prisma.engineer.findMany({
        orderBy: {
            createdAt: "desc",
        }
    });

    return engineers;
};

const getEngineerById = async (id) => {
    const engineerId = Number(id);

    const engineer = await prisma.engineer.findUnique({
        where: {
            id: engineerId,
        }
    });
    if(!engineer) {
        throw new ApiError(404, "Engineer not found");
    }

    return engineer;
};

const updateEngineer = async (id, engineerData) => {
    const engineerId = Number(id);
    const { name, email, phone, department } = engineerData;

    const existEngineer = await prisma.engineer.findUnique({
        where: {
            id: engineerId,
        }
    });

    if(!existEngineer) {
        throw new ApiError(404, "Engineer not found");
    }

    const updatedEngineer = await prisma.engineer.update({
        where: {
            id: engineerId,
        },
        data: {
            name,
            email,
            phone,
            department
        }
    });

    return updatedEngineer;
};


const deleteEngineer = async (id) => {
    const engineerId = Number(id);

    const existEngineer = await prisma.engineer.findUnique({
        where: {
            id: engineerId,
        }
    });

    if(!existEngineer) {
        throw new ApiError(404, "Engineer not found");
    }

    await prisma.engineer.delete({
        where: {
            id: engineerId,     
        }
    });

    return null;
};

export {
    createEngineer,
    getAllEngineers,
    getEngineerById,
    updateEngineer,
    deleteEngineer
};
