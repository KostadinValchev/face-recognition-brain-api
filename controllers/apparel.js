const manager = require("../common/manager");
const stringBuilder = require("../common/helpers");
const validate = require("../common/validations");

const handleApiCall = (req, res) => {
  manager.app.models
    .predict(Clarifai.APPAREL_MODEL, req.body.input)
    .then(data => {
      if (validate.isExisting(data)) res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("apparel_entries", 1)
    .increment("entries", 1)
    .returning(["entries", "apparel_entries"])
    .then(data => {
      if (validate.isExisting(data)) {
        const result = stringBuilder.buildCountersResults(data[0]);
        res.status(200).json(result);
      }
    })
    .catch(err => {
      res.status(400).json("unable to get apparel entries");
    });
};

module.exports = {
  handleApiCall,
  handleImage
};
