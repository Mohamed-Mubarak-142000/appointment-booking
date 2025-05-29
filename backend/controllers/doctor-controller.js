const asyncHandler = require("express-async-handler");
const Doctor = require("../models/Doctor.js");

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = asyncHandler(async (req, res) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Doctor.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Doctor.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const doctors = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: doctors.length,
    pagination,
    data: doctors,
  });
});

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
const getDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  res.status(200).json({
    success: true,
    data: doctor,
  });
});

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private/Doctor
const updateDoctor = asyncHandler(async (req, res) => {
  let doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  // Make sure user is doctor owner
  if (doctor._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this doctor");
  }

  doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: doctor,
  });
});

// @desc    Add available slots
// @route   PUT /api/doctors/:id/slots
// @access  Private/Doctor
const addAvailableSlots = asyncHandler(async (req, res) => {
  const { date, times } = req.body;
  let doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  // Make sure user is doctor owner
  if (doctor._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this doctor");
  }

  // Check if date already exists
  const dateIndex = doctor.availableSlots.findIndex(
    (slot) =>
      slot.date.toISOString().split("T")[0] ===
      new Date(date).toISOString().split("T")[0]
  );

  if (dateIndex >= 0) {
    // Add new times to existing date
    doctor.availableSlots[dateIndex].times = [
      ...new Set([...doctor.availableSlots[dateIndex].times, ...times]),
    ];
  } else {
    // Add new date with times
    doctor.availableSlots.push({ date, times });
  }

  await doctor.save();

  res.status(200).json({
    success: true,
    data: doctor.availableSlots,
  });
});

module.exports = {
  getDoctors,
  getDoctor,
  updateDoctor,
  addAvailableSlots,
};
