const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const contactsController = require('../controllers/contacts')

// Define the route handlers
router.get('/', contactsController.getAll)
router.get('/:id', [
  // Validate the ID parameter
  check('id').isMongoId().withMessage('Invalid ID format'),
  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  // Get a single contact
  contactsController.getSingle,
])

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Export the router
module.exports = router
