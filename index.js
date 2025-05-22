// const fs = require('fs');

// const filePath = 'data.json';

// let data = fs.readFileSync(filePath, 'utf8');
// let json = JSON.parse(data);

// const userKeys = Object.keys(json.users || {});
// const userNumbers = userKeys.map(key => parseInt(key.replace('user', ''))).filter(n => !isNaN(n));
// const nextId = userNumbers.length ? Math.max(...userNumbers) + 1 : 1;
// const newUserKey = `user${nextId}`;

// const newUser = {
//   name: "NewUserName",
//   age: 20
// };


// json.users[newUserKey] = newUser;

// fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

const mysql = require('mysql');
const http = require('http');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "food_db"
});

// Connect ONCE, not inside the request handler
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL");

  // Start server only after successful DB connection
  http.createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" }); // Better to use application/json if you're sending JSON

    con.query("SELECT * FROM orders", function (err, result) {
      if (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Database error" }));
        return;
      }
      res.end(JSON.stringify(result));
    });

  }).listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
  });
});
