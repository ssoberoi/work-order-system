import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
    createEngineer,
    updateEngineer,
} from "../../api/engineer.api";

const EngineerForm = ({ engineer, onClose }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (engineer) {
            reset(engineer);
        } else {
            reset({
                name: "",
                email: "",
                department: "",
                phone: "",
            });
        }
    }, [engineer, reset]);

    const onSubmit = async (data) => {
        try {
            if (engineer) {
                await updateEngineer(engineer.id, data);
                toast.success("Engineer updated successfully");
            } else {
                await createEngineer(data);
                toast.success("Engineer created successfully");
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
            <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">
                    {engineer ? "Edit Engineer" : "Add Engineer"}
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <input
                            className="w-full border rounded-lg p-3"
                            placeholder="Name"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            className="w-full border rounded-lg p-3"
                            placeholder="Email"
                            type="email"
                            disabled={!!engineer}
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            className="w-full border rounded-lg p-3"
                            placeholder="Department"
                            {...register("department", {
                                required: "Department is required",
                            })}
                        />
                        {errors.department && (
                            <p className="text-red-500 text-sm">
                                {errors.department.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            className="w-full border rounded-lg p-3"
                            placeholder="Phone"
                            {...register("phone", {
                                required: "Phone is required",
                            })}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="border px-4 py-2 rounded"
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
                                : engineer
                                ? "Update"
                                : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EngineerForm;