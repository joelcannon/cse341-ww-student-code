const express = require("express");
const contactsRoutes = require("./contacts");
const router = express.Router();

router.use("/contacts", contactsRoutes);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = router;
