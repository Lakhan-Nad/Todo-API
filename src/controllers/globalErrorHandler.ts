import { Request, Response, NextFunction } from "express";
import logger from "../logger";

const GLOABL_ERROR_CONTEXT = "EXPRESS GLOBAL ERROR HANDLER";

export default (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  logger.error(GLOABL_ERROR_CONTEXT, req.originalUrl, { status, message });
  res.status(status).json({ error: message });
};
