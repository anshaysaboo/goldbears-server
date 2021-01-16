const express = require("express");

const authenticate = require("../middlewares/authenticate.js");

const Auth = require("../controllers/auth.js");

// ROUTES FOR /api/auth
// Handles user login and sign up methods

const router = express.Router();

router.post("/register", Auth.register);
router.get("/user", authenticate, Auth.getUser);
router.post("/login", Auth.login);
router.post("/register/store", Auth.registerAndMakeStore);

module.exports = router;
