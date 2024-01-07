const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 4000;

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "drawing_board",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Collaborative online drawing board");
});

// API to save a drawing element
app.post("/api/draw", (req, res) => {
  const { ip, group_id, shape } = req.body;

  // Implement IP-based rate limiting here (using a database to store usage)

  const sql = "INSERT INTO drawings (ip, group_id, shape) VALUES (?, ?, ?)";
  db.query(sql, [ip, group_id, shape], (err, result) => {
    if (err) {
      console.error("MySQL error:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send("Element added successfully");
    }
  });
});

// API to get all drawing elements for a group_id
app.get("/api/draw/:group_id", (req, res) => {
  const { group_id } = req.params;
  const sql = "SELECT * FROM drawings WHERE group_id = ?";
  db.query(sql, [group_id], (err, result) => {
    if (err) {
      console.error("MySQL error:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
