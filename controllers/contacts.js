const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

/**
 * Retrieves all contacts from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const getAll = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find()
      .toArray()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

/**
 * Retrieves a single contact from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id)
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .findOne({ _id: userId })
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

/**
 * Creates a new contact in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const create = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .insertOne(req.body)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ id: result.insertedId })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getSingle, create }
