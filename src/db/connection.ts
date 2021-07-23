import * as mysql from "mysql";
import * as config from "../config";

let conn: mysql.Pool = undefined;

function init() {
  const connection = mysql.createPool({
    acquireTimeout: 50000,
    connectTimeout: 100000,
    timezone: "Z",
    timeout: 1000,
    connectionLimit: 10,
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
  });

  conn = connection;
}

export function getConnection(): mysql.Pool {
  if (!conn) {
    init();
  }
  return conn;
}

export function initializeSchema(): Promise<boolean> {
  const connection = getConnection();
  return new Promise<boolean>((res, rej) => {
    connection.query(
      "CREATE TABLE IF NOT EXISTS TASKS(id INTEGER AUTO_INCREMENT, title VARCHAR(100), description VARCHAR(500), category VARCHAR(30), dueDate TIMESTAMP, PRIMARY KEY(id))",
      (err, results) => {
        if (err) {
          rej(err);
        } else {
          res(true);
        }
      }
    );
  });
}
