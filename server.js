const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongodb = require("./db/connect");
const routes = require("./routes");
const config = require("./config"); // Import the config file

const app = express();

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", config.CORS_ORIGIN); // Use value from config
    next();
  })
  .use("/", routes);

mongodb.initDb((err, db) => {
  if (err) {
    console.error(err);
    process.exit(1); // Exit the process with a 'failure' code
  } else {
    app.listen(config.PORT, () => {
      // Use value from config
      console.log(`Connected to DB and listening on ${config.PORT}`); // Use value from config
    });
  }
});
