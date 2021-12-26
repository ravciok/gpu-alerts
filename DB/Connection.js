const mongose = require("mongoose");

const uri = process.env.DB_HOST;

const connectDb = async () => {
  await mongose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

  console.log('database conncted');
}

module.exports = connectDb;
