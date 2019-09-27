const manager = require("../Common/manager");
const stringBuilder = require("../Common/helpers");

const handleApiCall = (req, res) => {
  manager.app.models
    .predict(Clarifai.GENERAL_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("general_entries", 1)
    .increment("entries", 1)
    .returning(["entries", "general_entries"])
    .then(data => {
      const result = stringBuilder.buildCountersResults(data[0]);
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json("unable to get general entries");
    });
};

module.exports = {
  handleApiCall,
  handleImage
};
