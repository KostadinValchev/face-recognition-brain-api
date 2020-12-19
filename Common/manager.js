const Clarifai = require("../node_modules/clarifai");
const knex = require("../node_modules/knex");

const app = new Clarifai.App({
  apiKey: ""
});

var db = knex({
  client: "",
  connection: {
    host: "",
    user: "",
    password: "",
    database: ""
  }
});

module.exports = {
  app,
  db
};
