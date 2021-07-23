import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { BadRequestError, InternalServerError } from "../errors";
import { decrypt, encrypt } from "../utils/randoms";
import { getTasks, insertTask } from "../db/queries";

export async function getAllTasks(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let tasks: any[] = await getTasks();
  tasks.forEach((task) => {
    task.description = decrypt(task.description);
  });
  res.status(200).json(tasks);
}

export async function addTask(req: Request, res: Response, next: NextFunction) {
  let { title, description, category, due_date } = req.body;
  if (!_.isDate(due_date)) {
    next(new BadRequestError("due date provided is invalid"));
    return;
  }
  // store in ISO string format
  due_date = new Date(due_date).toISOString();
  description = encrypt(description);
  let inserted = await insertTask(title, description, category, due_date);
  if (inserted) {
    res.status(200).json({ status: "success", status_code: 200 });
    return;
  }
  next(new InternalServerError("task not inserted"));
}
