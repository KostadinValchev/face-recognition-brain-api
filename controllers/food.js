const manager = require("../Common/manager");

const handleApiCall = (req, res) => {
  manager.app.models
    .predict(Clarifai.FOOD_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("food_entries", 1)
    .increment("entries", 1)
    .returning(["entries", "food_entries"])
    .then(data => {
      res.status(200).json(data[0]);
    })
    .catch(err => {
      res.status(400).json("unable to get food entries");
    });
};

module.exports = {
  handleApiCall,
  handleImage
};
