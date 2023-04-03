const express = require('express');
const bodyparser = require('body-parser');
const mongoMeth = require('./mongoMeth');
const cors = require('cors');

const app = express();
const port = 8080;
const db = mongoMeth.db;

app.use(bodyparser.json());
app.use(cors());

app.get('/user/:id', async (req, res) => {
    const user = await db.getUser(req.params.id);
    user.login = JSON.parse(user.login);
    res.send(JSON.stringify(user));
});

app.post('/login', async (req, res) => {
    const data = req.body;
    const result = await db.UserExists(data.email);
    if (result.exists && !result.logged) {
        const user = await db.getUser(result.id);
        if (user.email === data.email && user.password === data.password) {
            res.send(JSON.stringify({ auth: true, msg: 'Success', id: result.id }));
            db.updateLogin(result.id, JSON.stringify({logged: true, device: data.device}));
        } else {
            res.send(JSON.stringify({ auth: false, msg: 'Invalid login' }));
        }
    } else if (result.exists && result.logged) {
        const user = await db.getUser(result.id);
        if (user.password === data.password) {
            res.send(JSON.stringify({ auth: false, msg: 'User is already logged in on a different device' }));
        } else {
            res.send(JSON.stringify({ auth: false, msg: 'Invalid login' }));
        }
    } else {
        res.send(JSON.stringify({ auth: false, msg: 'Invalid login' }));
    }
});

app.post('/signup', async (req, res) => {
    const data = req.body;
    const result = await db.UserExists(data.email);
    if (result.exists) {
        res.send(JSON.stringify({ msg: 'Email already in use' }));
    } else {
        db.createUser(data);
        res.send(JSON.stringify({ success: true }));
    }
});

app.post('/logout', async (req, res) => {
    const id = req.body.id;
    const update = JSON.stringify({ logged: false, device: 'none' });
    await db.updateLogin(id, update);
    res.send(JSON.stringify({ success: true }));
});

app.post('/deviceLogged', async (req, res) => {
    const device = req.body.device;
    const result = await db.loggedOnDevice(device);
    if (!result) {
        res.send(JSON.stringify({ success: false }));
    } else {
        res.send(JSON.stringify({ success: true, id: result }));
    }
});

app.listen(port, console.log(`Listening on port ${port}`));