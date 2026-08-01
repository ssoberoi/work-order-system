import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    createEngineer as createEngineerService,
    getAllEngineers as getAllEngineersService,
    getEngineerById as getEngineerByIdService,
    updateEngineer as updateEngineerService,
    deleteEngineer as deleteEngineerService,
} from "../services/engineer.service.js";

const createEngineer = asyncHandler(async (req, res) => {
    const { name, email, phone, department } = req.body;

    if(!name?.trim() || !email?.trim() || !phone?.trim() || !department?.trim()) {
        throw new ApiError(400, "All fields are required");
    };

    const engineer = await createEngineerService({
        name,
        email,
        phone,
        department
    });

    return res.status(201).json(
        new ApiResponse(
            201, engineer, "Engineer created successfully"  
        )
    );
});

const getAllEngineers = asyncHandler(async (req, res) => {
    const engineers = await getAllEngineersService();

    return res.status(200).json(
        new ApiResponse(
            200, engineers, "Engineers fetched successfully"
        )
    )
});

const getEngineerById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const engineerId = Number(id);

    if(isNaN(engineerId)){
        throw new ApiError(400, "Engineer id is invalid");
    }

    const engineer = await getEngineerByIdService(engineerId);

    return res.status(200).json(
        new ApiResponse(
            200, engineer, "Engineer fetched successfully"
        )
    );
});

const updateEngineer = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const { name, email, phone, department } = req.body;

    const engineerId = Number(id);

    if(isNaN(engineerId)){
        throw new ApiError(400, "Engineer id is invalid");
    }

    if(!name?.trim() || !email?.trim() || !phone?.trim() || !department?.trim()) {
        throw new ApiError(400, "All fields are required");
    }

    const updatedEngineer = await updateEngineerService(engineerId,
        {
            name, email, department, phone,
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200, updatedEngineer, "Engineer updated successfully"
        )
    );
});

const deleteEngineer = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const engineerId = Number(id);

    if(isNaN(engineerId)){
        throw new ApiError(400, "Engineer id is invalid");
    }

    await deleteEngineerService(engineerId);

    return res.status(200).json(
        new ApiResponse(
            200, null, "Engineer deleted successfully"
        )
    );
});

export {
    createEngineer,
    getAllEngineers,
    getEngineerById,
    updateEngineer,
    deleteEngineer
};