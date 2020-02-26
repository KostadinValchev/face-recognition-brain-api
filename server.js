const express = require("express");
const manager = require("./common/manager");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const food = require("./controllers/food");
const apparel = require("./controllers/apparel");
const general = require("./controllers/general");
const color = require("./controllers/color");

const app = express();
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("database.users");
});

app.post("/signin", (req, res) => {
  signIn.handleSignIn(req, res, manager.db, bcrypt);
});
app.post("/facebook-signin", (req, res) => {
  signIn.handleFacebookSignIn(req, res, manager.db);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, manager.db, bcrypt);
});
app.post("/facebook-register", (req, res) => {
  register.handleFacebookRegister(req, res, manager.db);
});

app.put("/resetpass", (req, res) => {
  profile.handleResetPassword(req, res, manager.db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, manager.db);
});
app.get("/facebook-profile/:id", (req, res) => {
  profile.handleFacebookProfile(req, res, manager.db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, manager.db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.post("/food", (req, res) => {
  food.handleApiCall(req, res);
});
app.put("/foodimage", (req, res) => {
  food.handleImage(req, res, manager.db);
});

app.post("/apparel", (req, res) => {
  apparel.handleApiCall(req, res);
});
app.put("/apparelimage", (req, res) => {
  apparel.handleImage(req, res, manager.db);
});

app.post("/general", (req, res) => {
  general.handleApiCall(req, res);
});
app.put("/generalimage", (req, res) => {
  general.handleImage(req, res, manager.db);
});

app.post("/color", (req, res) => {
  color.handleApiCall(req, res);
});
app.put("/colorimage", (req, res) => {
  color.handleImage(req, res, manager.db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.POST}`);
});

module.exports = app;
