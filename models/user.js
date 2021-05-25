import mongoose from "mongoose";
import validator from 'validator';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
    validate: (value) => {
      return validator.isMobilePhone(value);
    }
  },
  editTime: {
    type: Date,
    required: false,
    validate: (value) => {
      return validator.isDate(value);
    }
  },
});
const User = mongoose.model("user", userSchema, "user");
export { User };
