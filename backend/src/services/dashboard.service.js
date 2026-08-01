import prisma from "../config/prisma.js";

const getDashboardSummary = async () => {
    const totalMachines = await prisma.machine.count();
    const totalEngineers = await prisma.engineer.count();
    const totalWorkOrders = await prisma.workOrder.count();

    const openWorkOrders = await prisma.workOrder.count({
        where: {
            status: "OPEN",
        },
    });

    const assignedWorkOrders = await prisma.workOrder.count({
        where: {
            status: "ASSIGNED",
        },
    });

    const inProgressWorkOrders = await prisma.workOrder.count({
        where: {
            status: "IN_PROGRESS",
        }
    });

    const completedWorkOrders = await prisma.workOrder.count({
        where: {
            status: "COMPLETED",
        }
    });

    const cancelledWorkOrders = await prisma.workOrder.count({
        where: {
            status: "CANCELLED",
        }
    });

    const criticalWorkOrders = await prisma.workOrder.count({
        where: {
            priority: "CRITICAL",
        }
    })

    return {
        totalMachines,
        totalEngineers,
        totalWorkOrders,
        openWorkOrders,
        assignedWorkOrders,
        inProgressWorkOrders,
        completedWorkOrders,
        cancelledWorkOrders,
        criticalWorkOrders
    };
};

export {
    getDashboardSummary,
}
