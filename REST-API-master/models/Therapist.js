const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const therapistSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  id: {
    type: String,
    required: true
  },
  tz_number: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  institute: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

});

const Therapist = mongoose.model("Therapist", therapistSchema);
module.exports = Therapist;
