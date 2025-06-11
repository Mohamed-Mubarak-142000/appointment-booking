const express = require("express");
const {
  updatePatient,
  getBookedDoctors,
  getPatient,
} = require("../controllers/patient-controller");
const { protectPatient } = require("../middleware/auth");

const router = express.Router();

router.put("/:id", protectPatient, updatePatient);

router.get("/:id/doctors", protectPatient, getBookedDoctors);

router.get("/patient-details/:id", getPatient);

module.exports = router;
