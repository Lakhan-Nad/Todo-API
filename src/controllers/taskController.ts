import * as config from "../config";
import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { BadRequestError } from "../errors";
import { decrypt, encrypt } from "../utils/randoms";
import { getTasks } from "../db/queries";

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

export function addTask(req: Request, res: Response, next: NextFunction) {
  let { title, description, category, due_date } = req.body;
  if (!_.isDate(due_date)) {
    next(new BadRequestError("due date provided is invalid"));
    return;
  }
  // store in ISO string format
  due_date = new Date(due_date).toISOString();
  description = encrypt(description);
}
