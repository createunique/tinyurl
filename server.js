const express = require('express');
const crypto = require('crypto');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: 'HOSTNAME',
  user: 'DBUSERNAME',
  password: 'DBPASSWORD',
  database: 'DBNAME',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.post('/shorten', (req, res) => {
  const url = req.body.url;
  const shortCode = crypto.createHash('sha256').update(url).digest('hex').substring(0, 6);

  const query = 'INSERT INTO urls (long_url, short_code) VALUES (?, ?)';
  db.query(query, [url, shortCode], (err, result) => {
    if (err) throw err;
    res.send(`http://tinyurl.rf.gd/${shortCode}`);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
