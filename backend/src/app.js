const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import middleware cors
const app = express();
const port = 3500;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library831'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.use(cors()); // Gunakan middleware cors
// Middleware untuk menangani CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Ganti sesuai dengan origin Anda
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get('/', (req, res) => {
    res.send('Welcome to the backend server');
});

app.get('/biblio/count', (req, res) => {
    const sql = 'SELECT COUNT(*) AS count FROM biblio';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ count: results[0].count });
    });
});

app.get('/biblio/classification/count', (req, res) => {
    const sql = 'SELECT COUNT(DISTINCT classification) AS count FROM biblio WHERE classification IS NOT NULL AND classification != ""';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ count: results[0].count });
    });
});

app.get('/data_peminjam/classification/count', (req, res) => {
    const sql = `
      SELECT COUNT(DISTINCT b.classification) AS unique_classification_count
      FROM data_peminjam dp
      JOIN biblio b ON dp.judul_buku = b.title
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ unique_classification_count: results[0].unique_classification_count });
    });
});

// Endpoint untuk mendapatkan jenis classification yang ada pada data_peminjaman
app.get('/data_peminjaman/classification/exists', (req, res) => {
    const sql = `
        SELECT DISTINCT b.classification
        FROM data_peminjam dp
        JOIN biblio b ON dp.judul_buku = b.title
        WHERE b.classification IS NOT NULL AND b.classification != '';
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        const classifications = results.map(row => row.classification);
        res.json({ classifications });
    });
});

// Endpoint untuk mendapatkan jenis classification yang tidak ada pada data_peminjaman
app.get('/data_peminjaman/classification/not_exists', (req, res) => {
    const sql = `
        SELECT DISTINCT b.classification
        FROM biblio b
        LEFT JOIN data_peminjam dp ON dp.judul_buku = b.title
        WHERE dp.judul_buku IS NULL AND b.classification IS NOT NULL AND b.classification != '';
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        const classifications = results.map(row => row.classification);
        res.json({ classifications });
    });
});
app.get('/dataset_scrapping', (req, res) => {
    const sql = 'SELECT * FROM dataset_scrapping';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/dataset_pinjam', (req, res) => {
    const sql = 'SELECT * FROM dataset_pinjam';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/biblio', (req, res) => {
    const sql = 'SELECT * FROM biblio_w_author';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
