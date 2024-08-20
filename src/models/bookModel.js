const { required, array, number, boolean } = require("joi");
const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: array,
      required: true,
    },
    reviews: {
      type: number,
      default: 0,
    },
    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: boolean,
      default: false,
    },
    releasedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const books = mongoose.model("Books", bookSchema, "Books");


module.exports = books;
