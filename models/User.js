const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const keys = require("../config/keys");

// A User represents a single user of the app, and contains user data
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: "Your email is required",
    trim: true,
    immutable: true,
  },

  password: {
    type: String,
    required: "Your password is required",
    max: 100,
  },

  username: {
    type: String,
    unique: true,
    required: "Username is required",
    max: 100,
  },

  firstName: {
    type: String,
    required: "First name is required",
    max: 100,
  },

  lastName: {
    type: String,
    required: "Last name is required",
    max: 100,
  },
});

// automatically hash password before saving
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
  let payload = {
    id: this._id,
    email: this.email,
    username: this.username,
  };

  return jwt.sign(payload, keys.JWT_SECRET, { expiresIn: "2 days" });
};

module.exports = mongoose.model("users", userSchema);
