import { Router } from "express";

import {
    createWorkOrder,
    getAllWorkOrders,
    getWorkOrderById,
    updateWorkOrder,
    deleteWorkOrder,
} from "../controllers/workorder.controller.js";

const router = Router();

router.post("/", createWorkOrder);
router.get("/", getAllWorkOrders);
router.get("/:id", getWorkOrderById);
router.put("/:id", updateWorkOrder);
router.delete("/:id", deleteWorkOrder);

export default router;