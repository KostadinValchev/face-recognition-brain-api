const Clarifai = require("clarifai");
const knex = require('knex');

const app = new Clarifai.App({
  apiKey: "f60eec73097b400cbc22c65efe1093b3"
});

var db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '0889123902',
        database: 'smartbrain'
    }
});

module.exports = {
   app,
   db
  };
  