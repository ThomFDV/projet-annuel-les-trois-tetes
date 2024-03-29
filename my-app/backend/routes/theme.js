const express = require("express");
const passport = require("passport");

const ThemeController = require('../controllers/theme');

const isAdmin = require('../middleware/isAdmin');

const isTeacher = require('../middleware/isTeacher');

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), isTeacher, ThemeController.create);

router.get("", passport.authenticate("jwt", { session: false }), ThemeController.getThemes);

router.get("/:id", passport.authenticate("jwt", { session: false }), ThemeController.getThemeById);

router.get("/:id/orderId", passport.authenticate("jwt", { session: false }), ThemeController.getUserTheme);

router.post("/:id/newcourse", passport.authenticate("jwt", { session: false }), isTeacher, ThemeController.addCourse);

router.get("/:id/countcourse", passport.authenticate("jwt", { session: false }), ThemeController.countCourse);

router.get("/:themeId/course/:courseId", passport.authenticate("jwt", { session: false }), ThemeController.checkUserTheme);

router.delete("/:id", passport.authenticate("jwt", { session: false }), isAdmin, ThemeController.removeTheme);

module.exports = router;
