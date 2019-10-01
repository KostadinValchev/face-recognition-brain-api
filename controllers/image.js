const manager = require("../Common/manager");
const stringBuilder = require("../Common/helpers");
const validate = require("../Common/validations");

const handleApiCall = (req, res) => {
  manager.app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      if (validate.isExisting(data)) res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("face_entries", 1)
    .increment("entries", 1)
    .returning(["entries", "face_entries"])
    .then(data => {
      if (validate.isExisting(data)) {
        const result = stringBuilder.buildCountersResults(data[0]);
        res.status(200).json(result);
      }
    })
    .catch(err => {
      res.status(400).json("unable to get entries");
    });
};

module.exports = {
  handleImage,
  handleApiCall
};
