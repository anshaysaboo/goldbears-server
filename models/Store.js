const mongoose = require("mongoose");

// A Store represents a collection of products that are published by a single User
const storeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Store name is required",
    trim: true,
  },

  description: {
    type: String,
    required: "Description is required",
  },

  imageKey: String,

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
    unique: true,
  },
});

module.exports = mongoose.model("stores", storeSchema);
