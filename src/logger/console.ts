import chalk from "chalk";

export default {
  debug: (...args: any[]) => {
    console.log(chalk.magenta("DEBUG"), ...args);
  },
  info: (...args: any[]) => {
    console.debug(chalk.green("INFO"), ...args);
  },
  warn: (...args: any[]) => {
    console.warn(chalk.yellow("WARN"), ...args);
  },
  error: (...args: any[]) => {
    console.error(chalk.red("ERROR"), ...args);
  },
};
