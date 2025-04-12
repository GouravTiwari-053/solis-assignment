const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema({
  college_id: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
  year: { type: Number, required: true },
  highest_placement: Number,
  average_placement: Number,
  median_placement: Number,
  placement_rate: Number,
}, { collection: "college_placement" });

module.exports = mongoose.model("CollegePlacement", placementSchema);
