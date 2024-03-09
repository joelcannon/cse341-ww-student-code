require("dotenv").config();
const db = require("../models");
const Temple = db.Temple;

const apiKey = process.env.API_KEY;

const validateApiKey = (req, res, next) => {
  if (req.header("apiKey") !== apiKey) {
    return res
      .status(401)
      .json({ message: "Invalid apiKey, please read the documentation." });
  }
  next();
};

exports.createTemple = [
  validateApiKey,
  (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({ message: "Content can not be empty!" });
    }

    const temple = new Temple({
      temple_id: req.body.temple_id,
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
    });

    temple
      .save(temple)
      .then((data) => {
        res.json(data);
      })
      .catch(next);
  },
];

// exports.getAllTemples = [
//   validateApiKey,
//   (req, res, next) => {
//     Temple.find(
//       {},
//       {
//         temple_id: 1,
//         name: 1,
//         location: 1,
//         dedicated: 1,
//         additionalInfo: 1,
//         _id: 0,
//       }
//     )
//       .then((data) => {
//         res.json(data);
//       })
//       .catch(next);
//   },
// ];

exports.getAllTemples = (req, res, next) => {
  Temple.find()
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

exports.getTempleById = [
  validateApiKey,
  (req, res, next) => {
    const temple_id = req.params.temple_id;

    Temple.find({ temple_id: temple_id })
      .then((data) => {
        if (!data)
          return res
            .status(404)
            .json({ message: "Not found Temple with id " + temple_id });
        res.json(data[0]);
      })
      .catch(next);
  },
];

// Error handling middleware
exports.errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Some error occurred.",
  });
};

// Update a Temple by the id in the request
exports.updateTempleById = [
  validateApiKey,
  (req, res, next) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" });
    }

    const id = req.params.id;

    Temple.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            message: `Cannot update Temple with id=${id}. Maybe Temple was not found!`,
          });
        } else res.json({ message: "Temple was updated successfully." });
      })
      .catch(next);
  },
];

// Delete a Temple with the specified id in the request
exports.deleteTempleById = [
  validateApiKey,
  (req, res, next) => {
    const id = req.params.id;

    Temple.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            message: `Cannot delete Temple with id=${id}. Maybe Temple was not found!`,
          });
        } else {
          res.json({ message: "Temple was deleted successfully!" });
        }
      })
      .catch(next);
  },
];

// Delete all Temples from the database.
exports.deleteAllTemples = [
  validateApiKey,
  (req, res, next) => {
    Temple.deleteMany({})
      .then((data) => {
        res.json({
          message: `${data.deletedCount} Temples were deleted successfully!`,
        });
      })
      .catch(next);
  },
];
