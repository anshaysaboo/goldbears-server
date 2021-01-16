const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

const User = mongoose.model("users");
const Product = mongoose.model("products");
const { uploadImage, deleteImage } = require("../utils/S3Utils.js");
const getImagesForProducts = require("../utils/getImagesForProducts.js");

const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  12
);

// @route POST /api/products/
// @desc Creates a new store for the current user with the given information
// @access Private
exports.create = async (req, res) => {
  const storeId = req.storeId;
  try {
    // Upload image
    var imageKey = "";
    if (req.file) {
      const imageData = await uploadImage(req.file, nanoid());
      imageKey = imageData.key || "";
    }

    const tagsString = req.body.tags;
    if (!tagsString)
      return res.status(400).send({ message: "Must provide tags!" });
    delete req.body.tags;

    await new Product({
      ...req.body,
      tags: tagsString.split(","),
      imageKey,
      storeId,
    }).save();
    res.send({ message: "Successfully created the product!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/products/:id
// @desc Updates the details for a store
// @access Private
exports.update = async (req, res) => {
  const storeId = req.storeId;
  const productId = req.params.id;
  const newProduct = req.body;
  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product)
      return res.status(400).send({ message: "Product ID is invalid" });

    // Update image if provided
    if (req.file) {
      // Check if image already exists
      if (product.imageKey) {
        await uploadImage(req.file, product.imageKey);
      } else {
        const imageData = await uploadImage(req.file, nanoid());
        newProduct.imageKey = imageData.key || "";
      }
    }

    const productData = await Product.findOneAndUpdate(
      { _id: product._id },
      {
        ...newProduct,
      },
      {
        new: true,
      }
    );
    res.send(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @route DELETE /api/products/:id
// @desc Delete a product with the given ID
// @access Private
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    // Check if the product exists
    const product = await Product.findById(id);
    if (!product)
      return res.status(400).send({ message: "Product ID is invalid" });

    if (!product.storeId.equals(req.storeId))
      res
        .status(400)
        .send({ message: "Product does not belong to this store." });

    // Update image if provided
    if (product.imageKey) {
      await deleteImage(product.imageKey);
    }

    await Product.deleteOne({ _id: id });
    res.send(await Product.find({ storeId: req.storeId }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/products/search/?query="example"
// @desc Search for products with the given query
// @access Public
exports.search = async (req, res) => {
  try {
    const products = await Product.find(
      { $text: { $search: req.query.query } },
      { score: { $meta: "textScore" } },
      { limit: 10 }
    )
      .populate("storeId", "title description")
      .sort({ score: { $meta: "textScore" } });
    res.status(200).send(await getImagesForProducts(products));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
