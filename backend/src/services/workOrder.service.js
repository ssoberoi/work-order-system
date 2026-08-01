import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

const createWorkOrder = async (workOrderData) => {

    const {
        workOrderNumber,
        title,
        description,
        priority,
        estimatedHours,
        scheduledDate,
        machineId,
        engineerId,
    } = workOrderData;

    const existWorkOrder = await prisma.workOrder.findUnique({
        where: {
            workOrderNumber,
        }
    });

    if(existWorkOrder) {
        throw new ApiError(409, "Work order already exists");
    }

    const existMachine = await prisma.machine.findUnique({
        where: {
            id: machineId,
        },
    });

    if(!existMachine){
        throw new ApiError(404, "Machine not found");
    }

    const existEngineer = await prisma.engineer.findUnique({
        where: {
            id: engineerId,
        },
    });

    if(!existEngineer){
        throw new ApiError(404, "Engineer not found");  
    }

    const workOrder = await prisma.workOrder.create({
        data: {
            workOrderNumber,
            title,
            description,
            priority,
            estimatedHours,
            scheduledDate: new Date(scheduledDate),
            machineId,
            engineerId,
        },

        include: {
            machine: true,
            engineer: true,
        }
    });

    return workOrder;
};

const getAllWorkOrders = async (filters= {}) => {
const {
    status,
    priority,
    engineerId,
    machineId,
} = filters;

const where = {};

if(status) {
    where.status = status;
}

if(priority) {
    where.priority = priority;
}

if(engineerId) {
    where.engineerId = Number(engineerId);
}

if(machineId) {
    where.machineId = Number(machineId);
}

const workOrders = await prisma.workOrder.findMany({
    where,
    include: {
        machine: true,
        engineer: true,
    },
    orderBy: {
        createdAt: "desc",
    },
});

return workOrders;

};

const getWorkOrderById = async (id) => {
    const workOrderId = Number(id);

    const workOrder = await prisma.workOrder.findUnique({
        where: {
            id: workOrderId,
        },
        include: {
            machine: true,
            engineer: true,
        }
    });

    if(!workOrder){
        throw new ApiError(404, "Work order not found");
    }

    return workOrder;
};

const updateWorkOrder = async (id, workOrderData) => {
    const workOrderId = Number(id);

    const existWorkOrder = await prisma.workOrder.findUnique({
        where: {
            id: workOrderId,
        }
    });

    if(!existWorkOrder){
        throw new ApiError(404, "Work order not found");
    }

    const updatedWorkOrder = await prisma.workOrder.update({
        where: {
            id: workOrderId,
        },
        data: {
            title: workOrderData.title,
            description: workOrderData.description,
            priority: workOrderData.priority,
            estimatedHours: workOrderData.estimatedHours,
            scheduledDate: new Date(workOrderData.scheduledDate),
            machineId: workOrderData.machineId,
            engineerId: workOrderData.engineerId,
        },

        include: {
            machine: true,
            engineer: true,
        }
    });

    return updatedWorkOrder;
};

const deleteWorkOrder = async (id) => {
    const workOrderId = Number(id);

    const existWorkOrder = await prisma.workOrder.findUnique({
        where: {
            id: workOrderId,
        }
    });

    if(!existWorkOrder){
        throw new ApiError(404, "Work order not found");
    }

    await prisma.workOrder.delete({
        where: {
            id: workOrderId,
        }
    });
    return null;
}

export {
    createWorkOrder,
    getAllWorkOrders,
    getWorkOrderById,
    updateWorkOrder,
    deleteWorkOrder 
}