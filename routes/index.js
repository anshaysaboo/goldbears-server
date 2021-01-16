// Adds all created routers to the Express app
module.exports = (app) => {
  app.use("/api/auth", require("./authRouter.js"));
  app.use("/api/store", require("./storeRouter.js"));
};
