import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
    createMachine as createMachineService,
    getAllMachines as getAllMachinesService,
    getMachineById as getMachineByIdService,
    updateMachine as updateMachineService,
    deleteMachine as deleteMachineService,
} from "../services/machine.service.js";


const createMachine = asyncHandler(async (req, res) => {
    const { machineCode, machineName, plant, location, status } = req.body;

    if (
        !machineCode?.trim() ||
        !machineName?.trim() ||
        !plant?.trim() ||
        !location?.trim() ||
        !status
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const machine = await createMachineService({
        machineCode,
        machineName,
        plant,
        location,
        status
    });

    return res.status(201).json(
        new ApiResponse(
            201, machine, "machine created successfully"
        )
    );
})

const getAllMachines = asyncHandler(async (req, res) => {
    const machines = await getAllMachinesService();

    return res.status(200).json(
        new ApiResponse(
            200, machines, "machines fetched successfully"
        )
    );
});

const getMachineById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const machineId = Number(id);

    if(isNaN(machineId)){
        throw new ApiError(400, "Machine id is invalid");
    }

    const machine = await getMachineByIdService(machineId);

    return res.status(200).json(
        new ApiResponse(
            200, machine, "machine fetched successfully"
        )
    )
})

const updateMachine = asyncHandler(async (req, res) => {
    const {id}= req.params;

    const machineId = Number(id);

    if(isNaN(machineId)){
        throw new ApiError(400, "Machine id is invalid");
    }

    const { machineName, plant, location, status } = req.body;

    if(!machineName?.trim() || !plant?.trim() || !location?.trim() || !status){
        throw new ApiError(400, "All fields are required");
    }

    const updatedmachine = await updateMachineService(machineId,{
        machineName,
        plant,
        location,
        status
    });

    return res.status(200).json(
        new ApiResponse(
            200, updatedmachine, "machine updated successfully"
        )
    );
});

const deleteMachine = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const machineId = Number(id);

    if(isNaN(machineId)){  
        throw new ApiError(400, "Machine id is invalid");
    }

    await deleteMachineService(machineId);

    return res.status(200).json(
        new ApiResponse(
            200, null, "machine deleted successfully"
        )
    )
});


export { 
    createMachine, 
    getAllMachines, 
    getMachineById, 
    updateMachine,
    deleteMachine
 }