const express = require("express");
const {
  createUser,
  login,
  authStatus,
  logout,
} = require("../controllers/userController");
const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/authcheck").get(authStatus);

module.exports = router;
