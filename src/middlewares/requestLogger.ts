import { Request, Response, NextFunction } from "express";
import logger from "../logger";

const EXPRESS_REQUEST_CONTEXT = "EXPRESS REQUEST INFO";

export default (req: Request, res: Response, next: NextFunction) => {
  logger.info(EXPRESS_REQUEST_CONTEXT, `${req.method}`, `${req.originalUrl}`);
  next();
};
