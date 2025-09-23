const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'kastro', // Updated password
    database: 'cricket_db'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ',  err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Serve static files
app.use(express.static('public'));

// Handle POST request
app.post('/submit', (req, res) => {
    const { cricketerName, countryName } = req.body;

    console.log('Cricketer Name:', cricketerName);
    console.log('Country Name:', countryName);

    const sql = 'INSERT INTO cricketers (name, country) VALUES (?, ?)';
    db.query(sql, [cricketerName, countryName], (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err);
            res.status(500).send('Error inserting data');
            return;
        }
        console.log('Insert result:', result);
        res.send('Congratulations, you have successfully deployed');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
