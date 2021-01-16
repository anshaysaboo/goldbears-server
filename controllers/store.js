const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

const User = mongoose.model("users");
const Store = mongoose.model("stores");

const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  12
);

// @route POST /api/stores/
// @desc Creates a new store for the current user with the given information
// @access Private
exports.create = async (req, res) => {
  const ownerId = req.user._id;
  try {
    // Check if store has already been created
    const store = await Store.findOne({ ownerId });
    if (store)
      res
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

// @route PUT /api/stores/
// @desc Updates the details for a store
// @access Private
exports.update = async (req, res) => {
  const ownerId = req.user._id;
  const newStore = req.body;
  try {
    // Check if store has been created
    const store = await Store.findOne({ ownerId });
    if (!store)
      res
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
