import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DataTable from "../components/common/DataTable";
import MachineForm from "../components/machines/MachineForm";

import {
    getMachines,
    createMachine,
    updateMachine,
    deleteMachine,
} from "../api/machine.api";

const Machines = () => {

    const [machines, setMachines] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchMachines();
    }, []);

    const fetchMachines = async () => {
        try {
            const response = await getMachines();
            setMachines(response.data.data);
        } catch (error) {
            toast.error("Failed to load machines");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this machine?")) return;
        try {
            await deleteMachine(id);
            toast.success("Machine deleted");
            fetchMachines();
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    };

    const columns = [
        {
            key: "machineCode",
            label: "Code",
        },
        {
            key: "machineName",
            label: "Machine",
        },
        {
            key: "plant",
            label: "Plant",
        },
        {
            key: "location",
            label: "Location",
        },
        {
            key: "status",
            label: "Status",
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div className="flex gap-2">
                    <button
                        className="text-green-600"
                        onClick={() => {
                            setSelectedMachine(row);
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
                    Machines
                </h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                        setSelectedMachine(null);
                        setShowForm(true);
                    }}
                >
                    Add Machine
                </button>
            </div>

            <DataTable
                columns={columns}
                data={machines}
            />
            {
                showForm && (
                    <MachineForm
                        machine={selectedMachine}
                        onClose={() => {
                            setShowForm(false);
                            fetchMachines();
                        }}
                    />
                )
            }
        </div>
    );
};

export default Machines;