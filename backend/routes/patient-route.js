const express = require("express");
const {
  updatePatient,
  getBookedDoctors,
} = require("../controllers/patient-controller");
const { protectPatient } = require("../middleware/auth");

const router = express.Router();

router.route("/:id").put(protectPatient, updatePatient);

router.route("/:id/doctors").get(protectPatient, getBookedDoctors);

module.exports = router;
