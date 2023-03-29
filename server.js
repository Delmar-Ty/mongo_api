const express = require('express');
const bodyparser = require('body-parser');
const os = require('os');

const app = express();
const port = 8080;

app.use(bodyparser.json());

app.get('/api', (req, res) => {
    res.send({ msg: 'success' });
});

console.log(os.networkInterfaces());

app.listen(port, console.log(`Listening on port ${port}`));