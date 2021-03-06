const mysql = require('mysql2');
const pool = mysql.createPool({
  host: process.env.JAMBONES_MYSQL_HOST,
  user: process.env.JAMBONES_MYSQL_USER,
  password: process.env.JAMBONES_MYSQL_PASSWORD,
  database: process.env.JAMBONES_MYSQL_DATABASE,
  connectionLimit: process.env.JAMBONES_MYSQL_CONNECTION_LIMIT || 10
});

pool.getConnection((err, conn) => {
  if (err) return console.error(err, 'Error testing pool');
  conn.ping((err) => {
    if (err) return console.error(err, `Error pinging mysql at ${JSON.stringify({
      host: process.env.JAMBONES_MYSQL_HOST,
      user: process.env.JAMBONES_MYSQL_USER,
      password: process.env.JAMBONES_MYSQL_PASSWORD,
      database: process.env.JAMBONES_MYSQL_DATABASE,
      connectionLimit: process.env.JAMBONES_MYSQL_CONNECTION_LIMIT || 10
    })}`);
  });
});

module.exports = pool.getConnection.bind(pool);
