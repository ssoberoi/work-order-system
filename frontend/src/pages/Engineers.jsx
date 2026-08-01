import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DataTable from "../components/common/DataTable";
import EngineerForm from "../components/engineers/EngineerForm";
import {
    getEngineers,
    deleteEngineer,
} from "../api/engineer.api";

const Engineers = () => {
    const [engineers, setEngineers] = useState([]);
    const [selectedEngineer, setSelectedEngineer] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchEngineers();
    }, []);

    const fetchEngineers = async () => {
        try {
            const response = await getEngineers();
            setEngineers(response.data.data);
        } catch (error) {
            toast.error("Failed to load engineers");
        }
    };

    const handleClose = () => {
        setShowForm(false);
        setSelectedEngineer(null);
        fetchEngineers();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this engineer?")) return;

        try {
            await deleteEngineer(id);
            toast.success("Engineer deleted successfully");
            fetchEngineers();
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    };

    const columns = [
        {
            key: "name",
            label: "Name",
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "department",
            label: "Department",
        },
        {
            key: "phone",
            label: "Phone",
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div className="flex gap-3">
                    <button
                        className="text-green-600"
                        onClick={() => {
                            setSelectedEngineer(row);
                            setShowForm(true);
                        }}
                    >
                        Edit
                    </button>

                    <button
                        className="text-red-600"
                        onClick={() => handleDelete(row.id)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Engineers
                </h1>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                        setSelectedEngineer(null);
                        setShowForm(true);
                    }}
                >
                    Add Engineer
                </button>
            </div>

            <DataTable
                columns={columns}
                data={engineers}
            />

            {showForm && (
                <EngineerForm
                    engineer={selectedEngineer}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default Engineers;