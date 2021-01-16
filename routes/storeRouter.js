const express = require("express");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const authenticate = require("../middlewares/authenticate.js");
const { verifyStore } = require("../middlewares/verifyStore.js");

const Store = require("../controllers/store.js");

// ROUTES FOR /api/store
// Handles creating and updating of stores

const router = express.Router();

router.post("/", authenticate, upload.single("image"), Store.create);
router.put("/", authenticate, upload.single("image"), Store.update);
router.get("/products", authenticate, verifyStore, Store.getProducts);
router.get("/:id", Store.getDetails);

module.exports = router;
