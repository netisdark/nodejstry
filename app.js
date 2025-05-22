const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;
const connection = mysql.createConnection({
  host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.connect(err => {
  if (err) throw err;
  DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=yourpass
DB_DBNAME=mydb

});
app.get('/orders', (req, res) => {
  connection.query('SELECT * FROM orders', (err, results) => {
    if (err) throw err;

    const table = `
      <html>
      <head>
        <title>Orders Table</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Orders</h2>
        <table>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Method</th>
            <th>Address</th>
            <th>Products</th>
            <th>Product ID</th>
            <th>Total Price</th>
            <th>Placed On</th>
            <th>Payment Status</th>
          </tr>
          ${results.map(row => `
            <tr>
              <td>${row.id}</td>
              <td>${row.user_id}</td>
              <td>${row.name}</td>
              <td>${row.number}</td>
              <td>${row.email}</td>
              <td>${row.method}</td>
              <td>${row.address}</td>
              <td>${row.total_products}</td>
              <td>${row.product_id}</td>
              <td>${row.total_price}</td>
              <td>${row.placed_on}</td>
              <td>${row.payment_status}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;

    res.send(table);
  });
});

app.listen(port, () => {
  console.log(`Server is running at https://${__dirname}/orders`);
});
