const Clarifai = require("clarifai");
const knex = require('knex');

const app = new Clarifai.App({
  apiKey: ""
});

var db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: ''
    }
});

module.exports = {
   app,
   db
  };
  