const express = require("express");
const route = express.Router();

route.get('/', async (req, res) => {
  Card.find({}).sort('price').exec(async (err, data) => {
    if (err) return console.error(err);

    res.json(data);
  });
});

module.exports = route;
