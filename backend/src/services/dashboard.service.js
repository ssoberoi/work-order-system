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

    const today = new Date();
    const startDay = new Date(today);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(today);
    endDay.setHours(23, 59, 59, 999);

    const todaysScheduledWorkOrders = await prisma.workOrder.count({
        where: {
            scheduledDate: {
                gte: startDay,
                lte: endDay,
            }
        }
    });

    return {
        totalMachines,
        totalEngineers,
        totalWorkOrders,
        openWorkOrders,
        assignedWorkOrders,
        inProgressWorkOrders,
        completedWorkOrders,
        cancelledWorkOrders,
        criticalWorkOrders,
        todaysScheduledWorkOrders
    };
};

export {
    getDashboardSummary,
}
