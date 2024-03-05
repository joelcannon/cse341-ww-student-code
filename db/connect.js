/**
 * Initializes the database connection.
 * @param {Function} callback - The callback function to be called after the database is initialized.
 * @returns {Promise} A promise that resolves to the initialized database object.
 */
const initDb = async (callback) => {
  if (_db) {
    console.log('Db is already initialized!')
    return callback(null, _db)
  }
  try {
    _db = await MongoClient.connect(config.MONGODB_URI)
    callback(null, _db)
  } catch (err) {
    throw err
  }
}

/**
 * Retrieves the initialized database object.
 * @returns {Object} The initialized database object.
 * @throws {Error} If the database is not initialized.
 */
const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized')
  }
  return _db
}

module.exports = {
  initDb,
  getDb,
}
