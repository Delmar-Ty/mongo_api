const express = require('express');
const bodyparser = require('body-parser');
const mongoMeth = require('./mongoMeth');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8080;
const db = mongoMeth.db;

app.use(bodyparser.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.send({ msg: 'success' });
});

app.post('/login', async (req, res) => {
    console.log(req.body.email, req.body.password);
    await mongoose.connect();
    db.createUser({ email: req.body.email, password: req.body.password });
    mongoose.disconnect();
});

app.listen(port, console.log(`Listening on port ${port}`));