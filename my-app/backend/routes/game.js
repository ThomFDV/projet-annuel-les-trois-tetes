const express = require("express");
const passport = require("passport");

const GameController = require("../controllers/game");

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), GameController.create);
router.get("/collection", GameController.getCollection);

module.exports = router;
