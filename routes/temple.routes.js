const templeRouter = require("express").Router();
const templeController = require("../controllers/temple.controller.js");

templeRouter.get("/", templeController.getAllTemples);
// #swagger.description = 'get all Temples'
// #swagger.tags = ['temples']

templeRouter.get("/:temple_id", templeController.getTempleById);
// #swagger.description = 'get a single Temple by temple_id'
// #swagger.tags = ['temples']

templeRouter.post("/", templeController.createTemple);
// #swagger.description = 'add a new Temple'
// #swagger.tags = ['temples']

templeRouter.put("/:id", templeController.updateTempleById);
// #swagger.description = 'update a Temple by id'
// #swagger.tags = ['temples']

templeRouter.delete("/:id", templeController.deleteTempleById);
// #swagger.description = 'delete a single Temple by id'
// #swagger.tags = ['temples']

templeRouter.delete("/", templeController.deleteAllTemples);
// #swagger.description = 'delete all Temples'
// #swagger.tags = ['temples']

templeRouter.use(templeController.errorHandler);

module.exports = templeRouter;
