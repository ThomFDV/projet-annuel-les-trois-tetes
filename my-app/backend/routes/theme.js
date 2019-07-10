const express = require("express");
const passport = require("passport");

const ThemeController = require('../controllers/theme');

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), ThemeController.create);

router.get("", ThemeController.getThemes);

router.get("/:id", passport.authenticate("jwt", { session: false }), ThemeController.getThemeById);

router.get("/:id/orderId", passport.authenticate("jwt", { session: false }), ThemeController.getUserTheme);


router.post("/:id/newcourse", passport.authenticate("jwt", { session: false }), ThemeController.addCourse);

router.get("/:id/countcourse", passport.authenticate("jwt", { session: false }), ThemeController.countCourse);

//router.get("/:themeId/course/:courseId", passport.authenticate("jwt", { session: false }), ThemeController.getCourse);

router.get("/:themeId/course/:courseId", passport.authenticate("jwt", { session: false }), ThemeController.checkUserTheme);

module.exports = router;
