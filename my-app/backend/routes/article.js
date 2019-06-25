const express = require("express");
const passport = require("passport");

const ArticleController = require("../controllers/article");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), ArticleController.create);

router.get("/articles", ArticleController.getArticle);

router.get("/courses", ArticleController.getCours);

router.get("/article/:id", ArticleController.getArticleById);

router.post("/article/:id", ArticleController.addComment);

module.exports = router;
