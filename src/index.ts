import http from "http";
import { IS_TEST } from "./config";
import logger from "./logger";
import app from "./routes";
import { initializeSchema } from "./db/connection";

const server = http.createServer(app);
const SERVER_CONTEXT = "EXPRESS SERVER";

process.on("uncaughtException", (err) => {
  logger.error(SERVER_CONTEXT, "uncaughtException", err);
  stopProcess(true);
});

process.on("unhandledRejection", (err) => {
  logger.error(SERVER_CONTEXT, "unhandledRejection", err);
  stopProcess(true);
});

process.on("SIGINT", () => {
  logger.info(SERVER_CONTEXT, "SIGINT");
  stopProcess(false);
});

process.on("SIGTERM", () => {
  logger.info(SERVER_CONTEXT, "SIGTERM");
  stopProcess(false);
});

async function startProcess() {
  const mysqlStarted = await initializeSchema();
  if (!mysqlStarted) {
    logger.error(SERVER_CONTEXT, "unable to start mysql");
    stopProcess(true);
    return;
  }
  server.listen(3000, () => {
    logger.info(SERVER_CONTEXT, "Server is listening on port 3000");
  });
}

let stopped = false;

async function stopProcess(err: boolean = false) {
  if (stopped) {
    return;
  }
  stopped = true;
  logger.info(SERVER_CONTEXT, "Stopping server...");
  await server.close();
  process.exit(err ? 1 : 0);
}

if (!IS_TEST) {
  startProcess();
}
