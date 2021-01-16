const mongoose = require("mongoose");

// A Product represents a product listing shown within a Store
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Product name is required",
    trim: true,
  },

  description: {
    type: String,
    required: "Description is required",
  },

  imageKey: {
    type: String,
  },

  price: {
    type: Number,
    required: "Price is required",
  },

  shipsWithin: {
    type: Number,
    required: "shipsWithin is required",
  },

  charity: {
    type: String,
    required: "Charity is required.",
  },

  percentToCharity: {
    type: Number,
    required: "percentToCharity is required",
  },

  type: {
    type: String,
    required: "type is required",
  },

  tags: [String],

  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "stores",
  },
});

productSchema.index({
  tags: "text",
  title: "text",
  tags: "text",
  charity: "text",
});

module.exports = mongoose.model("products", productSchema);
