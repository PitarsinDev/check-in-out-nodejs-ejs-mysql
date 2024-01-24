const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'attendance_system'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/signin', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO attendance (name, status) VALUES (?, "signin")';
    db.query(sql, [name], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
});

app.post('/signout', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO attendance (name, status) VALUES (?, "signout")';
    db.query(sql, [name], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
});

app.post('/leave', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO attendance (name, status) VALUES (?, "leave")';
    db.query(sql, [name], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
});

app.get('/attendance-list', (req, res) => {
    const sql = 'SELECT * FROM attendance';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.render('attendance-list', { results });
    });
});

app.listen(port, () => {
    console.log('Server is running');
});