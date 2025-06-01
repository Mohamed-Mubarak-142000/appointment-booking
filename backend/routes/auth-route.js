const express = require("express");
const {
  registerDoctor,
  loginDoctor,
  getDoctorProfile,
  registerPatient,
  loginPatient,
  getPatientProfile,
  logout,
} = require("../controllers/auth-controller");
const { protectDoctor, protectPatient } = require("../middleware/auth");

const router = express.Router();

// Doctor Routes
router.post("/doctor/register", registerDoctor);
router.post("/doctor/login", loginDoctor);
router.get("/doctor/me", protectDoctor, getDoctorProfile);

// Patient Routes
router.post("/patient/register", registerPatient);
router.post("/patient/login", loginPatient);
router.get("/patient/me", protectPatient, getPatientProfile);

// Common Logout
router.post("/logout", logout);

module.exports = router;
