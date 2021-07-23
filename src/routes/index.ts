import express from "express";
import * as config from "../config";
import NotFoundHandler from "../controllers/notFoundHandler";
import GlobalErrorHandler from "../controllers/globalErrorHandler";
import appRoutes from "./app";
import RequestLogger from "../middlewares/requestLogger";

import { encrypt, decrypt } from "../utils/randoms";

const app = express();

app.disable("x-powered-by");
app.enable("case sensitive routing");
app.disable("strict routing");
app.enable("trust proxy");
app.set("env", config.NODE_ENV);

app.use(express.json());

app.use(RequestLogger);

// Application Specific Routes
app.use("/app", appRoutes);

// 404 error
app.use(NotFoundHandler);

// global error handler
app.use(GlobalErrorHandler);

export default app;
