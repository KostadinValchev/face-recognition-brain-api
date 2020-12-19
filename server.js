const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

const users = require("./routes/users");
const face = require("./routes/face-recognition");
const apparel = require("./routes/apparel-recognition");
const color = require("./routes/color-recognition");
const food = require("./routes/food-recognition");
const general = require("./routes/general-recognition");

app.get("/", (req, res) => {
  res.send("database.users");
});

app.use("/users", users);
app.use("/face-recognition", face);
app.use("/apparel-recognition", apparel);
app.use("/color-recognition", color);
app.use("/food-recognition", food);
app.use("/general-recognition", general);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.POST}`);
});

module.exports = app;
