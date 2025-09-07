// const db = require("./config/db");
// const cors = require("cors");
// const app = express();
// const PORT = 3306;

// app.use(cors());
// app.use(express.json());

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3306;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "itb-usa.a2hosted.com",
  user: "itbusaah_frontend_user",
  password: 11111,
  port: 3306,
  database: "itbusaah_frontend_database",
});

// ROUTE;
// app.get("/db", (req, res) => {
//   db.query("SELECT * FROM users", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//       console.log(result);
//       console.log("Connected!");
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost/${PORT}/`);
// });
