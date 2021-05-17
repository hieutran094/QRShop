import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
    default:"primary"
  }
});
const Card = mongoose.model("Card", cardSchema, "Card");
export { Card };
