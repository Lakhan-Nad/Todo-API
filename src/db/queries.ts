import { getConnection } from "./connection";

export function insertTask(
  title: string,
  description: string,
  category: string,
  dueDate: string
) {
  const connection = getConnection();
  return new Promise<string>((res, rej) => {
    connection.query(
      "INSERT INTO TASKS(description, category, dueDate) VALUES (?, ?, ?)",
      [title, description, category, dueDate],
      (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result.insertId.toString());
        }
      }
    );
  });
}

export function getTasks() {
  const connection = getConnection();
  return new Promise<any[]>((res, rej) => {
    connection.query("SELECT * FROM TASKS ORDER BY dueDate", (err, results) => {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  });
}
