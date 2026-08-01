import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const menu = [
        {
            name: "Dashboard",
            path: "/",
        },
        {
            name: "Machines",
            path: "/machines",
        },
        {
            name: "Engineers",
            path: "/engineers",
        },
        {
            name: "Work Orders",
            path: "/workorders",
        },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-white">
            <div className="text-2xl font-bold p-6 border-b border-slate-700">
                Work Order
            </div>
            <nav className="flex flex-col p-4 gap-2">
                {
                    menu.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `px-4 py-3 rounded-lg transition ${isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-700"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))
                }
            </nav>
        </aside>
    );
};

export default Sidebar;