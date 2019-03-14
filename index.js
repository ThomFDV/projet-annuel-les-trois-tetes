'use strict';

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on ${port}...`));

app.get('/', (req, res, next) => {
    res.send('Hello World').end();
});