const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

const userRoutes = require("./routes/user");
const articleRoutes = require("./routes/article");
const gameRoutes = require("./routes/game");

const app = express();

mongoose
    .connect(
        "mongodb+srv://thomfdv:jQ79foIEddShxDzf@clustermean-jbibp.mongodb.net/api-poker?retryWrites=true",
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/user", userRoutes);

app.use("/article", articleRoutes);

app.use("/game", gameRoutes);

module.exports = app;
