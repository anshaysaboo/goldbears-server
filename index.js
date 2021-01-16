const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const morgan = require("morgan");

const keys = require("./config/keys");
require("./models");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// MONGOOSE SETUP
mongoose.promise = global.Promise;
mongoose
  .connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err));
const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB Database connection established")
);
connection.on("error", (err) => {
  console.log("MongoDB connection error: " + err);
  process.exit();
});

// PASSPORT
app.use(passport.initialize());
require("./middlewares/passport")(passport);

// ROUTES
require("./routes")(app);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log("Server running on http://localhost:" + PORT + "/")
);
