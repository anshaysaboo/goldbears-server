const express = require("express");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const authenticate = require("../middlewares/authenticate.js");
const { verifyStore } = require("../middlewares/verifyStore.js");

const Product = require("../controllers/product.js");

// ROUTES FOR /api/store
// Handles creating and updating of stores

const router = express.Router();

router.post(
  "/",
  authenticate,
  verifyStore,
  upload.single("image"),
  Product.create
);
router.put(
  "/:id",
  authenticate,
  verifyStore,
  upload.single("image"),
  Product.update
);
router.delete("/:id", authenticate, verifyStore, Product.delete);

module.exports = router;
