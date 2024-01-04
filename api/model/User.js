const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    father: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      enum: ["Morning", "Evening"],
      required: true,
    },
    totalFee: {
      type: Number,
      required: true,
    },
    feePaid: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    subscriptionDate: {
      type: Date,
      required: true, // Initial subscription date can be set to null or a default date
    },
    feeStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    lastFeeUpdate: {
      type: Date,
      default: null, // Initial value can be set to null or a default date
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
