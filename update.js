const updateCards = require("./jobs/update-cards");
const cardsConfig = require("./configs/cards");
const connectDB = require('./DB/Connection');

connectDB();
updateCards(cardsConfig);
