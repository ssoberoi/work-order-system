import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

const createMachine = async (machineData) => {
    const { machineCode, machineName, plant, location, status } = machineData;

    const existingMachine = await prisma.machine.findUnique({
        where: {
            machineCode
        }
    });
    if(existingMachine) {
        throw new ApiError(409, "Machine code already exist");
    }

    const machine = await prisma.machine.create({
        data: {
            machineCode,
            machineName,
            plant,
            location,
            status
        }
    });

    return machine;
};

const getAllMachines = async () => {
    const machines = await prisma.machine.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    console.log(machines)
    return machines;
};

const getMachineById = async (id) => {
    const machineId = Number(id);
    
    const machine = await prisma.machine.findUnique({
        where: {
            id: machineId,
        },
    });

    if(!machine) {
        throw new ApiError(404, "Machine not found");
    }

    return machine;
}

const updateMachine = async (id, machineData) => {
    const machineId = Number(id);

    const existMachine = await prisma.machine.findUnique({
        where: {
            id: machineId,
        },
    });
    if(!existMachine) {
        throw new ApiError(404, "Machine not found");
    }

    const updatedMachine = await prisma.machine.update({
        where: {
            id: machineId,
        },
        data: {
            machineName: machineData.machineName,
            plant: machineData.plant,
            location: machineData.location,
            status: machineData.status
        }
    });

    return updatedMachine;
};

const deleteMachine = async (id) => {

    const machineId = Number(id);
    const existMachine = await prisma.machine.findUnique({
        where: {
            id: machineId
        },
    });
    if(!existMachine) {
        throw new ApiError(404, "Machine not found");
    }

    await prisma.machine.delete({
        where: {
            id: machineId,
        }
    });

    return null;
};


export { 
    createMachine,
    getAllMachines, 
    getMachineById, 
    updateMachine,
    deleteMachine
 }