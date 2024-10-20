const mongoose = require('mongoose')
require("dotenv").config()
let connection = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { connection }
