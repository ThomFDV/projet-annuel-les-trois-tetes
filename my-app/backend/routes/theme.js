const express = require("express");
const passport = require("passport");

const ThemeController = require("../controllers/theme");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), ThemeController.create);

router.get("", ThemeController.getThemes);

// router.get("/courses", passport.authenticate("jwt", { session: false }), ThemeController.getCourses);

router.get("/:id", passport.authenticate("jwt", { session: false }), ThemeController.getThemeById);

router.post("/:id/newcourse", passport.authenticate("jwt", { session: false }), ThemeController.addCourse);

router.get("/:id/countcourse", passport.authenticate("jwt", { session: false }), ThemeController.countCourse);

module.exports = router;
