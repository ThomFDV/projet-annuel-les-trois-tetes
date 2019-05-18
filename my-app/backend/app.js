const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.send("nice one").end();
});

module.exports = app;
