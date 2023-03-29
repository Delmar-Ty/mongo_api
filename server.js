const express = require('express');
const bodyparser = require('body-parser');
const db = require('./mongoMeth');

const app = express();
const port = 8080;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
    res.send({ msg: 'success' });
});

app.post('/login', (req, res) => {
    console.log(req.body.email, req.body.password);
});

app.listen(port, console.log(`Listening on port ${port}`));