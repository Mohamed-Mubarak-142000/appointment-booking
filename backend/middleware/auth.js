const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Doctor = require("../models/Doctor.js");
const Patient = require("../models/Patient.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if user is doctor or patient
      req.user =
        (await Doctor.findById(decoded.id).select("-password")) ||
        (await Patient.findById(decoded.id).select("-password"));

      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const isDoctor = (req, res, next) => {
  if (req.user && req.user.constructor.modelName === "Doctor") {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as a doctor");
  }
};

const isPatient = (req, res, next) => {
  if (req.user && req.user.constructor.modelName === "Patient") {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as a patient");
  }
};

module.exports = { protect, isDoctor, isPatient };
