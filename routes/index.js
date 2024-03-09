const routes = require("express").Router();
const templeRoutes = require("./temple.routes.js");

routes.use("/temples", templeRoutes);
routes.use(
  "/",
  (docData = (req, res) => {
    let docData = {
      documentationURL: "https://nathanbirch.github.io/nathan-byui-api-docs",
    };
    res.send(docData);
  })
);

module.exports = routes;
