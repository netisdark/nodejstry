const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'food_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
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
  console.log(`Server is running at http://localhost:${port}/orders`);
});
