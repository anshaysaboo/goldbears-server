const mongoose = require("mongoose");

const Store = mongoose.model("stores");

// Middleware that verifies that the current user has created a Store
exports.verifyStore = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const store = await Store.findOne({ ownerId });
    if (!store) {
      res
        .status(400)
        .send({ message: "A store for this user does not exist." });
    } else {
      req.storeId = store._id;
      next();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
