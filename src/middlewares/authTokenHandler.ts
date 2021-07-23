import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { UnauthorizedError } from "../errors";

export function BearerAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const authString = req.headers.authorization;

  if (_.isNil(authString)) {
    next(new UnauthorizedError("No Authorization Token"));
    return;
  }

  const [bearer, id] = authString.split(" ");

  if (bearer.toLowerCase() !== "bearer") {
    next(new UnauthorizedError("Invalid authorization token format"));
    return;
  }

  // attach authentication Id to the request
  // for further middleware and controllers to use it
  req["authId"] = id;
  next();
}
