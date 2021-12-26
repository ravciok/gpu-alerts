const express = require('express');
const cron = require('node-cron');
const connectDB = require('./DB/Connection');
const updateCards = require("./jobs/update-cards");
const cardsConfig = require("./configs/cards");

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.static(__dirname + '/public'));
app.use(express.json({extended: false}));
app.use('/api/cards/getList', require('./Api/cards/getList'));

cron.schedule('*/5 * * * *', async () => updateCards(cardsConfig), null);

app.listen(PORT, () => console.log('Server started on port: ', PORT));
