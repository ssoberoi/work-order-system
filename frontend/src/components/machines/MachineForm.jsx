import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
    createMachine,
    updateMachine,
} from "../../api/machine.api";

const MachineForm = ({ machine, onClose }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    useEffect(() => {
        if (machine) {
            reset(machine);
        } else {
            reset({
                machineCode: "",
                machineName: "",
                plant: "",
                location: "",
                status: "RUNNING",
            });
        }
    }, [machine, reset]);

    const onSubmit = async (data) => {
        try {
            if (machine) {
                await updateMachine(machine.id, data);
                toast.success("Machine updated successfully");
            } else {
                await createMachine(data);
                toast.success("Machine created successfully");
            }

            onClose();

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
                <h2 className="text-2xl font-bold mb-6">
                    {machine ? "Edit Machine" : "Add Machine"}
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <input
                            type="text"
                            placeholder="Machine Code"
                            className="w-full border rounded-lg p-3"
                            disabled={!!machine}
                            {...register("machineCode", {
                                required: "Machine code is required",
                            })}
                        />

                        {errors.machineCode && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.machineCode.message}
                            </p>
                        )}

                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Machine Name"
                            className="w-full border rounded-lg p-3"
                            {...register("machineName", {
                                required: "Machine name is required",
                            })}
                        />
                        {errors.machineName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.machineName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Plant"
                            className="w-full border rounded-lg p-3"
                            {...register("plant", {
                                required: "Plant is required",
                            })}
                        />
                        {errors.plant && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.plant.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Location"
                            className="w-full border rounded-lg p-3"
                            {...register("location", {
                                required: "Location is required",
                            })}
                        />

                        {errors.location && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.location.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <select
                            className="w-full border rounded-lg p-3"
                            {...register("status")}
                        >

                            <option value="RUNNING">
                                RUNNING
                            </option>

                            <option value="STOPPED">
                                STOPPED
                            </option>

                            <option value="MAINTENANCE">
                                MAINTENANCE
                            </option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            {isSubmitting
                                ? "Saving..."
                                : machine
                                ? "Update"
                                : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MachineForm;