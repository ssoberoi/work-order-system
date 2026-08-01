import { Router } from 'express';
import {createEngineer, 
    getAllEngineers,
    getEngineerById,
    updateEngineer,
    deleteEngineer} from '../controllers/engineer.controller.js';

    const router = Router();

    router.post("/", createEngineer);
    router.get("/", getAllEngineers);
    router.get("/:id", getEngineerById);
    router.put("/:id", updateEngineer);
    router.delete("/:id", deleteEngineer);

    export default router;
