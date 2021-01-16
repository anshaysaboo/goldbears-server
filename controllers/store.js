const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

const { getImageSignedURL, uploadImage } = require("../utils/S3Utils.js");
const getImagesForProducts = require("../utils/getImagesForProducts.js");

const User = mongoose.model("users");
const Store = mongoose.model("stores");
const Product = mongoose.model("products");

const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  12
);

// @route POST /api/store/
// @desc Creates a new store for the current user with the given information
// @access Private
exports.create = async (req, res) => {
  const ownerId = req.user._id;
  try {
    // Check if store has already been created
    const store = await Store.findOne({ ownerId });
    if (store)
      return res
        .status(400)
        .send({ message: "A store for this user has already been created." });

    // Upload banner for image
    var imageKey = "";
    if (req.file) {
      const imageData = await uploadImage(req.file, nanoid());
      imageKey = imageData.key || "";
    }

    await new Store({ ...req.body, imageKey, ownerId }).save();
    res.send({ message: "Successfully created your store!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @route PUT /api/store/
// @desc Updates the details for a store
// @access Private
exports.update = async (req, res) => {
  const ownerId = req.user._id;
  const newStore = req.body;
  try {
    // Check if store has been created
    const store = await Store.findOne({ ownerId });
    if (!store)
      return res
        .status(400)
        .send({ message: "A store for this user does not exist." });

    // Update image if provided
    if (req.file) {
      // Check if image already exists
      if (store.imageKey) {
        await uploadImage(req.file, store.imageKey);
      } else {
        const imageData = await uploadImage(req.file, nanoid());
        newStore.imageKey = imageData.key || "";
      }
    }

    const storeData = await Store.findOneAndUpdate(
      { _id: store._id },
      {
        title: newStore.title,
        description: newStore.description,
        imageKey: newStore.imageKey || "",
      },
      {
        new: true,
      }
    );
    res.send(storeData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/store/products/
// @desc Get a list of all products that are currently listed in the user's store.
// @access Private
exports.getProducts = async (req, res) => {
  const storeId = req.storeId;
  try {
    const products = await Product.find({ storeId });
    res.send(await getImagesForProducts(products));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/store/:id
// @desc Gets the details about this store, as well as a full list of the products it sells
// @access public
exports.getDetails = async (req, res) => {
  try {
    let store = await Store.findById(req.params.id).populate(
      "ownerId",
      "username firstName lastName"
    );
    store = store.toJSON();
    if (!store) return res.status(404).send({ message: "Invalid store ID." });

    const products = await Product.find({ storeId: store._id });
    store.products = await getImagesForProducts(products);

    if (store.imageKey) {
      const url = await getImageSignedURL(store.imageKey);
      store.imageUrl = url;
    }

    res.send(store);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/store
// @desc Returns the basic information about this store
// @access public
exports.getStore = async (req, res) => {
  try {
    let store = await Store.findById(req.storeId);
    const storeJson = store.toJSON();

    if (store.imageKey) {
      storeJson.imageUrl = await getImageSignedURL(store.imageKey);
    }

    res.send(storeJson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
