const express = require("express");
const { registerUser, loginUser, getUserPreferences, updateUserPreferences } = require("../controllers/user.controller");
const verifyJWT = require("../middlewares/verifyJWT.middleware");
const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router
  .route("/preferences")
  .all(verifyJWT)
  .get(getUserPreferences)
  .put(updateUserPreferences);

module.exports = router;

