const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  city_id: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  state_id: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
});

module.exports = mongoose.model("College", collegeSchema);
