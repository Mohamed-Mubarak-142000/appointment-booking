const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  specialty: {
    type: String,
    required: [true, "Please add a specialty"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  governorate: {
    type: String,
    required: [true, "Please add a governorate"],
  },
  phone: {
    type: String,
    required: [true, "Please add a phone number"],
  },
  age: {
    type: Number,
    required: [true, "Please add an age"],
  },
  bio: {
    type: String,
    required: [true, "Please add a bio"],
  },
  experience: {
    type: Number,
    required: [true, "Please add years of experience"],
  },
  available: {
    type: Boolean,
    default: true,
  },
  availableSlots: [
    {
      date: Date,
      times: [String],
    },
  ],
  photo: {
    type: String,
    default: "default.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Encrypt password before saving
DoctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Encrypt password using bcrypt
DoctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Doctor", DoctorSchema);
