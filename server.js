const express = require('express');
const cron = require('node-cron');
const connectDB = require('./DB/Connection');
const updateCards = require("./jobs/update-cards");
const cardsConfig = require("./configs/cards");
const visitSite = require("./jobs/visit-site");

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.static(__dirname + '/public'));
app.use(express.json({extended: false}));
app.use('/api/cards/getList', require('./Api/cards/getList'));

cron.schedule('0 0 * * *', async () => updateCards(cardsConfig), null);

if (process.env.KEEP_LIVE) {
  cron.schedule('*/25 * * * *', async () => visitSite(), null);
}

app.listen(PORT, () => console.log('Server started on port: ', PORT));
