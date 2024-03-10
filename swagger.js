const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'REST-client API',
    description:
      'BYUI CSE341 Week 2: API Documentation for REST-client project',
  },
  host: process.env.HOST || 'localhost',
  basePath: process.env.PORT ? `:${process.env.PORT}` : ':8080',
  schemes: [process.env.SWAGGER_SCHEME || 'http'],
}
console.log('env: ', doc.host, doc.schemes)

const outputFile = './swagger-output.json'
const routes = ['./routes/index.js']

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// swaggerAutogen(outputFile, routes, doc)
console.log('Running swagger script...')
swaggerAutogen(outputFile, routes, doc).then(() => {
  require('./server.js')
})
