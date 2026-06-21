import mysql from "mysql2";
import dotenv from "dotenv";
import { env } from "process";
dotenv.config();

// utilising .env files for enhacned security
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// test case imported from w3schools website
db.connect(function (err) {
  if (err) throw err;
  console.log(
    "Connection established to the database",
    process.env.MYSQL_DATABASE,
  );
});

export default db;
