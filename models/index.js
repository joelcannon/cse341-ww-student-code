const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Temple = require("./temple.model.js")(mongoose);

module.exports = db;
