const express = require("express");
const {
  updatePatient,
  getBookedDoctors,
} = require("../controllers/patient-controller");
const { protect, isPatient } = require("../middleware/auth");

const router = express.Router();

router.route("/:id").put(protect, isPatient, updatePatient);

router.route("/:id/doctors").get(protect, isPatient, getBookedDoctors);

module.exports = router;
