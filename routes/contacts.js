const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const contactsController = require('../controllers/contacts')

// Define the route handlers
router.get('/', [
  // #swagger.description = 'get all contacts'
  // #swagger.tags = ['contacts']

  contactsController.getAllContacts,
])

router.get('/:id', [
  // #swagger.description = 'get a single contact by id'
  // #swagger.tags = ['contacts']

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
  contactsController.getSingleContact,
])

router.post('/', [
  // #swagger.description = 'Create a new contact'
  // #swagger.tags = ['contacts']

  // Validate the request body
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Email is required'),
  check('favoriteColor').notEmpty().withMessage('Favorite color is required'),
  check('birthday').notEmpty().withMessage('Birthday is required'),

  // // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },

  // Create a new contact
  contactsController.createContact,
])

router.put('/:id', [
  // #swagger.description = 'Update a contact'
  // #swagger.tags = ['contacts']

  // Validate the ID parameter
  check('id').isMongoId().withMessage('Invalid ID format'),
  // Validate the other optional fields in the request body
  check('firstName')
    .optional()
    .notEmpty()
    .withMessage('First name is required'),
  check('lastName').optional().notEmpty().withMessage('Last name is required'),
  check('email').optional().isEmail().withMessage('Invalid email format'),
  check('favoriteColor')
    .optional()
    .notEmpty()
    .withMessage('Favorite color is required'),
  check('birthday').optional().notEmpty().withMessage('Birthday is required'),
  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
  // Update a contact
  contactsController.updateContact,
])

router.delete('/:id', [
  // #swagger.description = 'Delete a contact'
  // #swagger.tags = ['contacts']

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
  // Delete a contact
  contactsController.deleteContact,
])

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Export the router
module.exports = router
