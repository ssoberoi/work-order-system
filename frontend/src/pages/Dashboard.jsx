import { useEffect, useState } from "react";
import DashboardCard from "../components/dashboard/DashboardCard";
import { getDashboardSummary } from "../api/dashboard.api";
import DataTable from "../components/common/DataTable";

const Dashboard = () => {
    const [summary, setSummary] = useState({});

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await getDashboardSummary();
            setSummary(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            key: "workOrderNumber",
            label: "Work Order",
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
            key: "scheduledDate",
            label: "Scheduled Date",
            render: (row) =>
                new Date(row.scheduledDate).toLocaleDateString(),
        },
        {
            key: "actions",
            label: "Actions",
            render: () => (
                <div className="flex gap-2">
                    <button className="text-blue-600">
                        View
                    </button>
                    <button className="text-green-600">
                        Edit
                    </button>
                    <button className="text-red-600">
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <DashboardCard
                    title="Open Orders"
                    value={summary.openWorkOrders || 0}
                />
                <DashboardCard
                    title="Completed Orders"
                    value={summary.completedWorkOrders || 0}
                />
                <DashboardCard
                    title="Critical Orders"
                    value={summary.criticalWorkOrders || 0}
                />
                <DashboardCard
                    title="Total Machines"
                    value={summary.totalMachines || 0}
                />
                <DashboardCard
                    title="Engineers"
                    value={summary.totalEngineers || 0}
                />
            </div>
        </div>
    );
};

export default Dashboard;