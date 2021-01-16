const express = require("express");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const authenticate = require("../middlewares/authenticate.js");

const Store = require("../controllers/store.js");

// ROUTES FOR /api/store
// Handles creating and updating of stores

const router = express.Router();

router.post("/", authenticate, upload.single("image"), Store.create);
router.put("/", authenticate, upload.single("image"), Store.update);

module.exports = router;
