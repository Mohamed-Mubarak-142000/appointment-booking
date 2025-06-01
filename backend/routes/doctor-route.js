const express = require("express");
const {
  getDoctors,
  getDoctor,
  updateDoctor,
  addAvailableSlots,
} = require("../controllers/doctor-controller");
const { protectDoctor } = require("../middleware/auth");

const router = express.Router();

// Public routes (accessible without authentication)
router.route("/").get(getDoctors);
router.route("/:id").get(getDoctor);

// Doctor-only routes
router.route("/:id").put(protectDoctor, updateDoctor);

router.route("/:id/slots").put(protectDoctor, addAvailableSlots);

module.exports = router;
