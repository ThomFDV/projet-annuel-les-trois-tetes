const express = require("express");
const passport = require("passport");

const ArticleController = require("../controllers/article");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), ArticleController.create);

module.exports = router;
