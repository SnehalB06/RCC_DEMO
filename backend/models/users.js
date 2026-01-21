const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {

    username: { type: String, required: true, unique: true, trim: true },
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    middleName: {
      type: String,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String, 
      required: true,
      trim: true
    },

    role: {
      type: String,
      enum: ['EMPLOYEE', 'ADMIN', 'PM', 'CLIENT'],
      default: 'EMPLOYEE'
    },

    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE'
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model('User', UserSchema);