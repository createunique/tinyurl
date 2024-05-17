
const express = require('express');
const crypto = require('crypto');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'sql200.infinityfree.com',
    user: 'if0_36329016',
    password: 'W61DxPiDLMGDqN3',
    database: 'if0_36329016_url_short_t',
  });

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process with failure code
  }
  console.log('Connected to database');
});

app.post('/shorten', (req, res) => {
  const url = req.body.url;
  const shortCode = crypto.createHash('sha256').update(url).digest('hex').substring(0, 6);

  const query = 'INSERT INTO urls (long_url, short_code) VALUES (?, ?)';
  db.query(query, [url, shortCode], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Server error');
    }
    res.send(`https://tinyurl.vercel.app/${shortCode}`);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
