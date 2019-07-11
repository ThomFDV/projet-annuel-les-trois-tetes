const express = require("express");
const passport = require("passport");

const ArticleController = require("../controllers/article");

const checkAuth = require("../middleware/check-auth");

const isAdmin = require('../middleware/isAdmin');

const isTeacher = require('../middleware/isTeacher');

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), ArticleController.create);

router.get("", ArticleController.getArticle);

router.get("/:id", ArticleController.getArticleById);

router.post("/:id", passport.authenticate("jwt", { session: false }), ArticleController.addComment);

module.exports = router;
