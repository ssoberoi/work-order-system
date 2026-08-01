import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
    createWorkOrder as createWorkOrderService,
    getAllWorkOrders as getAllWorkOrdersService,
    getWorkOrderById as getWorkOrderByIdService,
    updateWorkOrder as updateWorkOrderService,
    deleteWorkOrder as deleteWorkOrderService,
} from "../services/workorder.service.js";

const createWorkOrder = asyncHandler(async (req, res) => {
    const { workOrderNumber, title, description, priority, status, estimatedHours, scheduledDate, machineId, engineerId } = req.body;
    const selectedDate = new Date(scheduledDate);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        throw new ApiError(400, "Scheduled date cannot be in the past");
    }

    if (Number(estimatedHours) <= 0) {
        throw new ApiError(400, "Estimated hours must be greater than 0");
    }

    if (!workOrderNumber?.trim() ||
        !title?.trim() ||
        !description?.trim() ||
        !priority?.trim() ||
        estimatedHours === undefined ||
        !scheduledDate?.trim() ||
        !machineId ||
        !engineerId) {
        throw new ApiError(400, "All fields are required");
    }

    const workOrder = await createWorkOrderService({
        workOrderNumber,
        title,
        description,
        priority,
        status,
        estimatedHours: Number(estimatedHours),
        scheduledDate,
        machineId: Number(machineId),
        engineerId: Number(engineerId),
    });

    return res.status(201).json(
        new ApiResponse(
            201, workOrder, "Work order created successfully"
        )
    );
});

const getAllWorkOrders = asyncHandler(async (req, res) => {

    const { status, priority, machineId, engineerId, workOrderNumber, fromDate, toDate } = req.query;

    const workOrders = await getAllWorkOrdersService({
        status,
        priority,
        machineId: machineId ? Number(machineId) : undefined,
        engineerId: engineerId ? Number(engineerId) : undefined,
        workOrderNumber,
        fromDate,
        toDate,
    });

    return res.status(200).json(
        new ApiResponse(
            200, workOrders, "Work orders fetched successfully"
        )
    );
});

const getWorkOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const workOrderId = Number(id);
    if (isNaN(workOrderId)) {
        throw new ApiError(400, "Work order id is invalid");
    }

    const workOrder = await getWorkOrderByIdService(workOrderId);

    return res.status(200).json(
        new ApiResponse(
            200, workOrder, "Work order fetched successfully"
        )
    );
});

const updateWorkOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const workOrderId = Number(id);
    if (isNaN(workOrderId)) {
        throw new ApiError(400, "work order id is invalid");
    }

    const {
        title,
        description,
        priority,
        status,
        estimatedHours,
        scheduledDate,
        machineId,
        engineerId
    } = req.body;

    const selectedDate = new Date(scheduledDate);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        throw new ApiError(400, "Scheduled date cannot be in the past");
    }

    if (Number(estimatedHours) <= 0) {
        throw new ApiError(400, "Estimated hours must be greater than 0");
    }

    if (!title?.trim() ||
        !description?.trim() ||
        !priority?.trim() ||
        estimatedHours === undefined ||
        !scheduledDate?.trim() ||
        !machineId ||
        !engineerId) {
        throw new ApiError(400, "All fields are required");
    }

    const updatedWorkOrder = await updateWorkOrderService(workOrderId, {
        title,
        description,
        priority,
        status,
        estimatedHours: Number(estimatedHours),
        scheduledDate,
        machineId: Number(machineId),
        engineerId: Number(engineerId)
    });

    return res.status(200).json(
        new ApiResponse(
            200, updatedWorkOrder, "Work order updated successfully"
        )
    );
});

const deleteWorkOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const workOrderId = Number(id);
    if (isNaN(workOrderId)) {
        throw new ApiError(400, "Work order id is invalid");
    }

    await deleteWorkOrderService(workOrderId);

    return res.status(200).json(
        new ApiResponse(
            200, null, "Work order deleted successfully"
        )
    );
});

export {
    createWorkOrder,
    getAllWorkOrders,
    getWorkOrderById,
    updateWorkOrder,
    deleteWorkOrder
};