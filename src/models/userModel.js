const { string, required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: ["Mr", "Mrs", "Miss"],
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      requied: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      street: { type: String },
      city: { type: String },
      pin: { type: String },
    },
  },
  { timestamps: true }
);

const user = mongoose.model("Users", userSchema, "Users");


module.exports=user;