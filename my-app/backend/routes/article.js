const express = require("express");
const passport = require("passport");

const ArticleController = require("../controllers/article");

const isAdmin = require('../middleware/isAdmin');

const isTeacher = require('../middleware/isTeacher');

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), isTeacher, ArticleController.create);

router.get("", passport.authenticate("jwt", { session: false }), ArticleController.getArticle);

router.get("/:id", passport.authenticate("jwt", { session: false }), ArticleController.getArticleById);

router.post("/:id", passport.authenticate("jwt", { session: false }), ArticleController.addComment);

router.delete("/:id", passport.authenticate("jwt", { session: false }), isAdmin, ArticleController.removeArticle);


module.exports = router;
