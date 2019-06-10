const express = require("express");
const passport = require("passport");

const GameController = require("../controllers/game");

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), GameController.create);
router.get("/collection", GameController.getCollection);
router.get("/:id", GameController.getGame);
router.put("/join/:id", passport.authenticate("jwt", { session: false }), GameController.join);
router.put("/leave/:id", passport.authenticate("jwt", { session: false }), GameController.leave);

module.exports = router;
