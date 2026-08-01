import { Router } from "express";
import { getDashboardSummaryController } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/", getDashboardSummaryController);

export default router;