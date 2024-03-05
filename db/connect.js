const MongoClient = require("mongodb").MongoClient;
const config = require("../config"); // assuming you have a config.js file exporting your configurations

let _db;

const initDb = async (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  try {
    _db = await MongoClient.connect(config.MONGODB_URI);
    callback(null, _db);
  } catch (err) {
    throw err;
  }
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
