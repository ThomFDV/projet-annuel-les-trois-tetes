const express = require("express");
const passport = require("passport");

const GameController = require("../controllers/game");

const checkAuth = require("../middleware/check-auth");

const isAdmin = require('../middleware/isAdmin');

const isTeacher = require('../middleware/isTeacher');

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), isTeacher, GameController.create);

router.get("/collection", passport.authenticate("jwt", { session: false }), GameController.getCollection);

router.get("/play/:id", passport.authenticate("jwt", { session: false }), GameController.play);

router.get("/:id", passport.authenticate("jwt", { session: false }), GameController.getGame);

router.put("/bet/:id", passport.authenticate("jwt", { session: false }), GameController.bet);

router.put("/fold/:id", passport.authenticate("jwt", { session: false }), GameController.fold);

router.put("/join/:id", passport.authenticate("jwt", { session: false }), GameController.join);

router.put("/leave/:id", passport.authenticate("jwt", { session: false }), GameController.leave);

module.exports = router;
