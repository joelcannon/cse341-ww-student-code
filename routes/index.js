/**
 * Module dependencies.
 */
const express = require('express')
const contactsRoutes = require('./contacts')

/**
 * Express router instance.
 * @type {express.Router}
 */
const router = express.Router()

/**
 * Mounts the contacts routes on the "/contacts" path.
 * @name router.use/contacts
 * @function
 */
router.use('/contacts', contactsRoutes)

/**
 * Error handling middleware.
 * @name router.use/errorHandler
 * @function
 * @param {Error} err - The error object.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

module.exports = router
