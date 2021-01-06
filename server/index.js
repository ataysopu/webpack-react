const express = require('express');
const path = require('path'); // NEW
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

const todos = require('../api/todos');

app.use(express.static(DIST_DIR));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE); // EDIT
});

app.get('/api/todos', (req, res) => {
    res.send(todos);
});

app.listen(port, function () {
    console.log('App listening on port: ' + port);
});