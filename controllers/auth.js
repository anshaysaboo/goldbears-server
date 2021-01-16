const mongoose = require("mongoose");

const User = mongoose.model("users");

const keys = require("../config/keys");

// @route POST api/auth/register
// @desc Registers a user with the information provided in the request body
// @access Public
exports.register = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    if (!username || !password || !email || !firstName || !lastName)
      return res.status(403).send({
        message:
          "Please provide email, password, username, firstName, and lastName.",
      });

    // Ensure account doesn't exist
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(401)
        .json({ message: "An account with the username already exists." });

    await new User({ username, password, email, firstName, lastName }).save();

    res.status(200).send({ message: "User successfully registered!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/auth/login
// @desc Login user and return JWT Token
// @access Public
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user)
      return res.status(401).json({
        message: "The username provided does not match any account",
        type: "invalid-username",
      });

    // validate password
    if (!user.comparePassword(password))
      return res
        .status(401)
        .json({ message: "Invalid password.", type: "invalid-password" });

    // Successful Login
    const { _id, email } = user;
    res.status(200).json({
      token: user.generateJWT(),
      user: { _id, username, email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET api/auth/user
// @desc Returns the current user's data
exports.getUser = async (req, res) => {
  try {
    const { _id, email, username } = req.user;
    res.send({
      _id,
      email,
      username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
