const express = require('express');
const path = require('path'); // NEW
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

const todos = require('../api/todos');

let nextId = 4;

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

app.post('/api/todos', (req, res) => {
    const todo = {
        id: nextId++,
        name: req.body.title,
        stocked: true,
        category: "Sporting Goods",
        price: `$${req.body.price}`
    };

    todos.push(todo);

    res.send(todo);
});

app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(todo => todo.id == req.params.id);

    if (!todo) return res.sendStatus(404);

    todo.name = req.body.title || todo.name;
    todo.price = req.body.price || todo.price;

    res.json(todo);
});

app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(todo => todo.id == req.params.id);
    res.send(todo);
});

app.patch('/api/todos/:id', (req, res) => {
    const todo = todos.find(todo => todo.id == req.params.id);

    if (!todo) return res.sendStatus(404);

    todo.name = req.body.title || todo.name;
    todo.price = req.body.price || todo.price;

    res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const index = todos.findIndex(todo => todo.id == req.params.id);

    if (index === -1) return res.sendStatus(404);

    todos.splice(index, 1);

    res.sendStatus(204);
});

app.listen(port, function () {
    console.log('App listening on port: ' + port);
});