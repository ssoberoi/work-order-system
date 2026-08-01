import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
    createWorkOrder,
    updateWorkOrder,
} from "../../api/workorder.api";

const WorkOrderForm = ({
    workOrder,
    machines,
    engineers,
    onClose,
}) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {

        if (workOrder) {

            reset({
                workOrderNumber: workOrder.workOrderNumber,
                title: workOrder.title,
                description: workOrder.description,
                priority: workOrder.priority,
                status: workOrder.status,
                estimatedHours: workOrder.estimatedHours,
                scheduledDate: workOrder.scheduledDate.slice(0, 10),
                machineId: workOrder.machineId,
                engineerId: workOrder.engineerId,
            });

        } else {

            reset({
                workOrderNumber: "",
                title: "",
                description: "",
                priority: "MEDIUM",
                status: "OPEN",
                estimatedHours: "",
                scheduledDate: "",
                machineId: "",
                engineerId: "",
            });

        }

    }, [workOrder, reset]);

    const onSubmit = async (data) => {

        try {

            const payload = {
                ...data,
                estimatedHours: Number(data.estimatedHours),
                machineId: Number(data.machineId),
                engineerId: Number(data.engineerId),
            };

            if (workOrder) {

                await updateWorkOrder(workOrder.id, payload);

                toast.success("Work Order updated successfully");

            } else {

                await createWorkOrder(payload);

                toast.success("Work Order created successfully");

            }

            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Something went wrong"
            );

        }

    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-2xl font-bold mb-6">
                    {workOrder ? "Edit Work Order" : "Add Work Order"}
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <input
                        className="w-full border rounded-lg p-3"
                        placeholder="Work Order Number"
                        disabled={!!workOrder}
                        {...register("workOrderNumber", {
                            required: "Work order number is required",
                        })}
                    />

                    {errors.workOrderNumber && (
                        <p className="text-red-500 text-sm">
                            {errors.workOrderNumber.message}
                        </p>
                    )}

                    <input
                        className="w-full border rounded-lg p-3"
                        placeholder="Title"
                        {...register("title", {
                            required: "Title is required",
                        })}
                    />

                    {errors.title && (
                        <p className="text-red-500 text-sm">
                            {errors.title.message}
                        </p>
                    )}

                    <textarea
                        rows={4}
                        className="w-full border rounded-lg p-3"
                        placeholder="Description"
                        {...register("description", {
                            required: "Description is required",
                        })}
                    />

                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description.message}
                        </p>
                    )}

                    <p>Select Priority</p>
                    <select
                        className="w-full border rounded-lg p-3"
                        {...register("priority")}
                    >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                        <option value="CRITICAL">CRITICAL</option>
                    </select>
                    <p>Select Status</p>
                    <select
                        className="w-full border rounded-lg p-3"
                        {...register("status")}
                    >
                        <option value="OPEN">OPEN</option>
                        <option value="ASSIGNED">ASSIGNED</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>

                    <input
                        type="number"
                        className="w-full border rounded-lg p-3"
                        placeholder="Estimated Hours"
                        {...register("estimatedHours", {
                            required: "Estimated hours is required",
                            min: {
                                value: 1,
                                message: "Estimated hours must be greater than 0",
                            },
                        })}
                    />

                    {errors.estimatedHours && (
                        <p className="text-red-500 text-sm">
                            {errors.estimatedHours.message}
                        </p>
                    )}

                    <input
                        type="date"
                        className="w-full border rounded-lg p-3"
                        {...register("scheduledDate", {
                            required: "Scheduled date is required",
                            validate: (value) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);

                                const selectedDate = new Date(value);
                                selectedDate.setHours(0, 0, 0, 0);

                                return (
                                    selectedDate >= today ||
                                    "Scheduled date cannot be in the past"
                                );
                            },
                        })}
                    />

                    {errors.scheduledDate && (
                        <p className="text-red-500 text-sm">
                            {errors.scheduledDate.message}
                        </p>
                    )}

                    <select
                        className="w-full border rounded-lg p-3"
                        {...register("machineId", {
                            required: "Machine is required",
                        })}
                    >
                        <option value="">Select Machine</option>

                        {machines.map((machine) => (
                            <option
                                key={machine.id}
                                value={machine.id}
                            >
                                {machine.machineName}
                            </option>
                        ))}

                    </select>

                    {errors.machineId && (
                        <p className="text-red-500 text-sm">
                            {errors.machineId.message}
                        </p>
                    )}

                    <select
                        className="w-full border rounded-lg p-3"
                        {...register("engineerId", {
                            required: "Engineer is required",
                        })}
                    >
                        <option value="">Select Engineer</option>

                        {engineers.map((engineer) => (
                            <option
                                key={engineer.id}
                                value={engineer.id}
                            >
                                {engineer.name}
                            </option>
                        ))}

                    </select>

                    {errors.engineerId && (
                        <p className="text-red-500 text-sm">
                            {errors.engineerId.message}
                        </p>
                    )}

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            className="border px-5 py-2 rounded"
                            onClick={onClose}
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
                                : workOrder
                                    ? "Update"
                                    : "Create"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default WorkOrderForm;