import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DataTable from "../components/common/DataTable";
import WorkOrderForm from "../components/workorders/WorkOrderForm";

import {
    getWorkOrders,
    deleteWorkOrder,
} from "../api/workorder.api";

import { getMachines } from "../api/machine.api";
import { getEngineers } from "../api/engineer.api";

const WorkOrders = () => {

    const [workOrders, setWorkOrders] = useState([]);
    const [machines, setMachines] = useState([]);
    const [engineers, setEngineers] = useState([]);
    const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({
        status: "",
        priority: "",
        machineId: "",
        engineerId: "",
    });

    useEffect(() => {

        fetchMachines();
        fetchEngineers();

    }, []);

    useEffect(() => {
        fetchWorkOrders();
    }, [filters, search]);
    
    const fetchMachines = async () => {

        try {
            const response = await getMachines();
            setMachines(response.data.data);
        } catch {
            toast.error("Unable to load machines");
        }

    };

    const fetchEngineers = async () => {

        try {
            const response = await getEngineers();
            setEngineers(response.data.data);
        } catch {
            toast.error("Unable to load engineers");
        }

    };

    const fetchWorkOrders = async () => {

        try {
            const response = await getWorkOrders({
                ...filters,
                workOrderNumber: search,
            });
            setWorkOrders(response.data.data);
        } catch {
            toast.error("Unable to load work orders");
        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this work order?")) return;

        try {
            await deleteWorkOrder(id);
            toast.success("Deleted successfully");
            fetchWorkOrders();
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    };

    const handleClose = () => {
        setShowForm(false);
        setSelectedWorkOrder(null);
        fetchWorkOrders();
    };

    const columns = [
        {
            key: "workOrderNumber",
            label: "WO Number",
        },
        {
            key: "title",
            label: "Title",
        },
        {
            key: "machine",
            label: "Machine",
            render: (row) => row.machine.machineName,
        },
        {
            key: "engineer",
            label: "Engineer",
            render: (row) => row.engineer.name,
        },
        {
            key: "priority",
            label: "Priority",
        },
        {
            key: "status",
            label: "Status",
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div className="flex gap-3">
                    <button
                        className="text-green-600"
                        onClick={() => {
                            setSelectedWorkOrder(row);
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
                    Work Orders
                </h1>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                        setSelectedWorkOrder(null);
                        setShowForm(true);
                    }}
                >
                    Add Work Order
                </button>

            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Work Order Number"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-80 border rounded-lg p-2"
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                <select
                    value={filters.status}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            status: e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                >
                    <option value="">All Status</option>
                    <option value="OPEN">OPEN</option>
                    <option value="ASSIGNED">ASSIGNED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>

                <select
                    value={filters.priority}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            priority: e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                >
                    <option value="">All Priority</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                </select>

                <select
                    value={filters.machineId}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            machineId: e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                >
                    <option value="">All Machines</option>

                    {machines.map((machine) => (
                        <option
                            key={machine.id}
                            value={machine.id}
                        >
                            {machine.machineName}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.engineerId}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            engineerId: e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                >
                    <option value="">All Engineers</option>

                    {engineers.map((engineer) => (
                        <option
                            key={engineer.id}
                            value={engineer.id}
                        >
                            {engineer.name}
                        </option>
                    ))}
                </select>

            </div>

            <DataTable
                columns={columns}
                data={workOrders}
            />
            {showForm && (
                <WorkOrderForm
                    workOrder={selectedWorkOrder}
                    machines={machines}
                    engineers={engineers}
                    onClose={handleClose}
                />
            )}

        </div>
    );
};

export default WorkOrders;