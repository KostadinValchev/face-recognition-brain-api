const manager = require("../common/manager");
const stringBuilder = require("../common/helpers");
const validate = require("../common/validations");

const handleApiCall = (req, res) => {
  const { input, viaBytes } = req.body;
  const imageData = viaBytes ? { base64: input.substring(23) } : input;

  manager.app.models
    .predict(Clarifai.FOOD_MODEL, imageData)
    .then(data => {
      if (validate.isExisting(data)) res.json(data);
    })
    .then(data => console.log(data))
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
      if (validate.isExisting(data)) {
        const result = stringBuilder.buildCountersResults(data[0]);
        res.status(200).json(result);
      }
    })
    .catch(err => {
      res.status(400).json("unable to get food entries");
    });
};

module.exports = {
  handleApiCall,
  handleImage
};
