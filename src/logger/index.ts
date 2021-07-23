import consoleLogger from "./console";

export interface Logger {
  debug(...args: any[]): void;
  error(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
}

export enum LogLevel {
  debug = 0,
  info,
  warn,
  error,
}

export enum LogType {
  json = "json",
  simple = "simple",
}

let logger: Logger = consoleLogger;

let currentLogLevel: LogLevel = LogLevel.debug;

let currentLogType: LogType = LogType.simple;

export function setLogger(loggerInstance: Logger = consoleLogger) {
  logger = loggerInstance;
}

export function setLogLevel(logLevel: LogLevel | string) {
  if (typeof logLevel === "string") {
    logLevel = String.prototype.toLowerCase.call(logLevel);
    switch (logLevel) {
      case "debug":
        logLevel = LogLevel.debug;
        break;
      case "info":
        logLevel = LogLevel.info;
        break;
      case "warn":
        logLevel = LogLevel.warn;
        break;
      case "error":
        logLevel = LogLevel.error;
        break;
      default:
        logLevel = LogLevel.debug;
    }
  }
  currentLogLevel = logLevel;
}

export function setLogType(logType: LogType | string = LogType.simple) {
  if (typeof logType === "string") {
    logType = String.prototype.toLowerCase.call(logType);
  }
  if (logType === "json") {
    currentLogType = LogType.json;
  } else {
    currentLogType = LogType.simple;
  }
}

export function error(context: string, ...args: any[]) {
  if (currentLogLevel <= LogLevel.debug) {
    if (currentLogType === LogType.json) {
      logger.error(
        `[${new Date().toISOString()}]`,
        context,
        ":  ",
        JSON.stringify(args, null, 2)
      );
    } else {
      logger.error(`[${new Date().toISOString()}]`, context, ":  ", ...args);
    }
  }
}

export function debug(context: string, ...args: any[]) {
  if (currentLogLevel <= LogLevel.debug) {
    if (currentLogType === LogType.json) {
      logger.debug(
        `[${new Date().toISOString()}]`,
        context,
        ":  ",
        JSON.stringify(args, null, 2)
      );
    } else {
      logger.debug(`[${new Date().toISOString()}]`, context, ":  ", ...args);
    }
  }
}

export function info(context: string, ...args: any[]) {
  if (currentLogLevel <= LogLevel.info) {
    if (currentLogType === LogType.json) {
      logger.info(
        `[${new Date().toISOString()}]`,
        context,
        ":  ",
        JSON.stringify(args, null, 2)
      );
    } else {
      logger.info(`[${new Date().toISOString()}]`, context, ":  ", ...args);
    }
  }
}

export function warn(context: string, ...args: any[]) {
  if (currentLogLevel <= LogLevel.info) {
    if (currentLogType === LogType.json) {
      logger.warn(
        `[${new Date().toISOString()}]`,
        context,
        ":  ",
        JSON.stringify(args, null, 2)
      );
    } else {
      logger.warn(`[${new Date().toISOString()}]`, context, ":  ", ...args);
    }
  }
}

export default { warn, error, info, debug };
