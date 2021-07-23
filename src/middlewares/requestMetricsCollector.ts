import { Request, Response, NextFunction } from "express";
import logger from "../logger";

const EXPRESS_METRICS = "EXPRESS REQUEST METRICS";

export default (req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime.bigint();
  const reqSize = Number.parseInt(req.headers["content-length"] || "0", 10);
  res.on("finish", () => {
    const timeDiff = process.hrtime.bigint() - startTime;
    const url = req.originalUrl
      .replace(
        /[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i,
        "<id>"
      )
      .replace(/^[0-9]$/gi, "<id>");
    logger.info(
      EXPRESS_METRICS,
      `${req.method}`,
      `${url}`,
      `${res.statusCode}`,
      `time : ${timeDiff} ns`,
      `req-size: ${reqSize}`,
      `res-size: ${Number.parseInt(res.get("content-length") || "0", 10)}`
    );
  });
  next();
};
