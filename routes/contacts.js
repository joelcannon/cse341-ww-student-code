const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll);

router.get("/:id", [
  check("id").isMongoId().withMessage("Invalid ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  contactsController.getSingle,
]);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = router;
