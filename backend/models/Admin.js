// Admin Model — stores admin user credentials (hashed password)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    // Store only hashed passwords
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Instance method to verify a plaintext password against the stored hash
adminSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

module.exports = mongoose.model('Admin', adminSchema);
