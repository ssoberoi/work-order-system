import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware.js";
import machineRoutes from "./routes/machine.routes.js";
import engineerRoutes from "./routes/engineer.routes.js";
import workOrderRoutes from "./routes/workOrder.routes.js"; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running successfully"
    });
});

app.use("/api/machines", machineRoutes);
app.use("/api/engineers", engineerRoutes);
app.use("/api/work-orders", workOrderRoutes);

app.use(errorHandler);

export default app;