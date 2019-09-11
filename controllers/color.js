const manager = require("../Common/manager");

const handleApiCall = (req, res) => {
  manager.app.models
    .predict(Clarifai.COLOR_MODEL, req.body.input)
    .then(data => {
      const colors = data.outputs[0].data.colors.sort(
        (a, b) => b.value - a.value
      );
      res.json(colors);
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
      res.json(data[0]);
    })
    .catch(err => {
      res.status(400).json("unable to get color entries");
    });
};

module.exports = {
  handleApiCall,
  handleImage
};
