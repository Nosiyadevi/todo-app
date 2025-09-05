const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",   // default in XAMPP
  password: "",   // leave empty (unless you set a password in phpMyAdmin)
  database: "todo_db"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL connected...");
});

module.exports = db;
