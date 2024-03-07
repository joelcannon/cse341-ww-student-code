const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "temple-api",
    description: "BYUI CSE341 Week 2: API Documentation for temple-api server",
  },
  host: process.env.HOST || "localhost:8080",
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
console.log("Running swagger script...");
