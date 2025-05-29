const asyncHandler = require("express-async-handler");
const Patient = require("../models/Patient.js");

const updatePatient = asyncHandler(async (req, res) => {
  let patient = await Patient.findById(req.params.id);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  // Make sure user is patient owner
  if (patient._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this patient");
  }

  patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: patient,
  });
});

const getBookedDoctors = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate(
    "bookedDoctors"
  );

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  // Make sure user is patient owner
  if (patient._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to view this patient");
  }

  res.status(200).json({
    success: true,
    count: patient.bookedDoctors.length,
    data: patient.bookedDoctors,
  });
});

module.exports = {
  updatePatient,
  getBookedDoctors,
};
