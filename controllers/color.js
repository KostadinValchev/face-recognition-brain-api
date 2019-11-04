const manager = require("../common/manager");
const stringBuilder = require("../common/helpers");
const validate = require("../common/validations");

const handleApiCall = (req, res) => {
  manager.app.models
    .predict(Clarifai.COLOR_MODEL, req.body.input)
    .then(data => {
      if (validate.isExisting(data)) {
        const colors = data.outputs[0].data.colors.sort(
          (a, b) => b.value - a.value
        );
        res.json({ colors, imageUrl: data.outputs[0].input.data.image.url });
      }
    })
    .catch(err => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("color_entries", 1)
    .increment("entries", 1)
    .returning(["entries", "color_entries"])
    .then(data => {
      if (validate.isExisting(data)) {
        const result = stringBuilder.buildCountersResults(data[0]);
        res.status(200).json(result);
      }
    })
    .catch(err => {
      res.status(400).json("unable to get color entries");
    });
};

module.exports = {
  handleApiCall,
  handleImage
};
