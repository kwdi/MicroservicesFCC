const mongoose = require("../db");


const schema = new mongoose.Schema(
  {
  url: { type: String, required: true },
  hash: { type: String, required: true }
  });


module.exports = mongoose.model("urlsModel", schema);
