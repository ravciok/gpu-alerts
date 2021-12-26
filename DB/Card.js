const mongoose = require('mongoose');

const card = new mongoose.Schema({
  name: {
    type: String
  },
  url: {
    type: String
  },
  shop: {
    type: String
  },
  price: {
    type: Number
  },
  createdAt: {
    type: Date
  },
})

module.exports = Card = mongoose.model('card', card);
