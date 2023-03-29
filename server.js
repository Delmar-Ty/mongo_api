const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send({ msg: 'success' });
});

app.listen(port, console.log(`Listening on port ${port}`));