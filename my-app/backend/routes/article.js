const express = require("express");
const passport = require("passport");

const ArticleController = require("../controllers/article");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), ArticleController.create);

router.get("/articles", ArticleController.getArticle);

router.get("/courses", passport.authenticate("jwt", { session: false }), ArticleController.getCours);

router.get("/:id", ArticleController.getArticleById);

router.post("/:id", passport.authenticate("jwt", { session: false }), ArticleController.addComment);

module.exports = router;
