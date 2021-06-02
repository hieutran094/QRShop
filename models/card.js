import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  header: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  hover: {
    type: Boolean,
    required: false,
  },
  badge: {
    type: [String],
    required: false,
    blackbox: true,
  },
  type: {
    type: String,
    required: true,
    default: "primary",
  },
  url: {
    type: String,
    required: false,
    default: "/",
  },
  col: {
    type: Number,
    required: true,
    default: 4,
  },
  edit_emp: {
    type: String,
    required: false,
  },
  edit_time: {
    type: Date,
    required: false,
    validate: (value) => {
      return validator.isDate(value);
    },
    default: Date.now(),
    trim: true,
  },
});
const Card = mongoose.model("Card", cardSchema, "Card");
export { Card };
