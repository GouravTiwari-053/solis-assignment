const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  college_id: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
  course_name: { type: String, required: true },
  course_duration: { type: String, required: true },
  course_fee: { type: Number, required: true },
}, { collection: "college_wise_course" });

module.exports = mongoose.model("CollegeCourse", courseSchema);
