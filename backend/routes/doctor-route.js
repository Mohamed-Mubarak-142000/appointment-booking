const express = require("express");
const {
  getDoctors,
  getDoctor,
  updateDoctor,
  addAvailableSlots,
} = require("../controllers/doctor-controller");
const { protect, isDoctor } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getDoctors);

router.route("/:id").get(getDoctor).put(protect, isDoctor, updateDoctor);

router.route("/:id/slots").put(protect, isDoctor, addAvailableSlots);

module.exports = router;
