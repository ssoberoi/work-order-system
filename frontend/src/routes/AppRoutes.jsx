import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Machines from "../pages/Machines";
import Engineers from "../pages/Engineers";
import WorkOrders from "../pages/WorkOrders";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/machines" element={<Machines />} />
                    <Route path="/engineers" element={<Engineers />} />
                    <Route path="/workorders" element={<WorkOrders />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;