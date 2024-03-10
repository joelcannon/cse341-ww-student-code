/**
 * Loads environment variables from a .env file into process.env.
 * @name dotenv
 * @type {Function}
 * @returns {void}
 */
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const mongodb = require('./db/connect')
const routes = require('./routes')
const config = require('./config') // Import the config file

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')

const app = express()

app
  .use(express.raw({ type: 'application/json' }))
  .use((req, res, next) => {
    console.log(req.body.toString()) // Log the raw request body
    next()
  })
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', config.CORS_ORIGIN) // Use value from config
    next()
  })
  .use('/', routes)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/**
 * Initializes the MongoDB database connection.
 * @name initDb
 * @function
 * @param {Error} err - The error object, if any.
 * @param {Object} db - The MongoDB database object.
 * @returns {void}
 */
mongodb.initDb((err, db) => {
  if (err) {
    console.error(err)
    process.exit(1) // Exit the process with a 'failure' code
  } else {
    /**
     * Starts the Express server and listens on the specified port.
     * @name listen
     * @function
     * @param {number} PORT - The port number to listen on.
     * @returns {void}
     */
    app.listen(config.PORT, () => {
      // Use value from config
      console.log(`Connected to DB and listening on ${config.PORT}`) // Use value from config
    })
  }
})
