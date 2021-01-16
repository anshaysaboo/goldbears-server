const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

const User = mongoose.model("users");
const Product = mongoose.model("products");

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

    await new Product({ ...req.body, imageKey, storeId }).save();
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
    res.send({ message: "Product successfully deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
