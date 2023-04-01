const express = require('express');
const bodyparser = require('body-parser');
const mongoMeth = require('./mongoMeth');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8080;
const db = mongoMeth.db;
const dbURL = 'mongodb+srv://Delmar:Something123@cluster0.tg0mxdx.mongodb.net/User';


app.use(bodyparser.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.send({ msg: 'success' });
});

app.post('/login', async (req, res) => {
    const data = req.body;
    const result = await db.UserExists(data.email);
    if (result.exists && !result.logged) {
        const user = await db.getUser(result.id);
        if (user.email === data.email && user.password === data.password) {
            res(JSON.stringify({ auth: true, msg: 'Success' }));
            db.updateLogin(result.id, JSON.stringify({logged: true, device: data.device}));
        } else {
            res(JSON.stringify({ auth: false, msg: 'Invalid login' }));
        }
    } else if (result.exists && result.logged) {
        res(JSON.stringify({ auth: false, msg: 'User is already logged in on a different device' }));
    } else {
        res(JSON.stringify({ auth: false, msg: 'Invalid login' }));
    }
});

app.post('/signup', async (req, res) => {
    const data = req.body;
    const result = await db.UserExists(data.email);
    if (result.exists) {
        res.send(JSON.stringify({ msg: 'Email already in use' }));
    } else {
        db.createUser(data);
    }
});

app.listen(port, console.log(`Listening on port ${port}`));