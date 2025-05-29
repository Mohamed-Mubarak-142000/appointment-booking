const express = require("express");
const {
  registerDoctor,
  registerPatient,
  login,
  getMe,
  logout,
} = require("../controllers/auth-controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register/doctor", registerDoctor);
router.post("/register/patient", registerPatient);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

module.exports = router;
