import express, { Request, Response, NextFunction } from "express";
import { getAllTasks, addTask } from "../../controllers/taskController";

const router = express.Router();

router.get("/", getAllTasks);

router.post("/", addTask);

export default router;
