const templeRouter = require("express").Router();
const templeController = require("../controllers/temple.controller.js");

templeRouter.get("/", templeController.getAllTemples);
templeRouter.get("/:temple_id", templeController.getTempleById);

templeRouter.post("/", templeController.createTemple);

templeRouter.put("/temples/:id", templeController.updateTempleById);

templeRouter.delete("/temples/:id", templeController.deleteTempleById);
templeRouter.delete("/temples", templeController.deleteAllTemples);

templeRouter.use(templeController.errorHandler);

module.exports = templeRouter;
