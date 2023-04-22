const mysql = require("mysql2");
const util = require("util");

const pool = mysql.createPool(process.env.DATABASE_URL);
pool.on("connection", (_conn: any) => {
  if (_conn) {
    console.log("Connected to database via threadId ", _conn.threadId);
  }
});
const keepAlive = () => {
  pool.getConnection((err: any, connection: any) => {
    if (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Database connection was closed.");
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        console.log("Database has too many connections.");
      }
      if (err.code === "ECONNREFUSED") {
        console.log("Database connection was refused.");
      }
    }
  });
};

setInterval(keepAlive, 30000);
pool.query = util.promisify(pool.query);
module.exports = pool;
