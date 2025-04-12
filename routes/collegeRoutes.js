const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/college_data/:college_id",verifyToken, collegeController.getCollegeData);
router.get("/college_courses/:college_id",verifyToken, collegeController.getCollegeCourses);
router.get("/colleges", verifyToken, collegeController.getCollegesByFilter);

module.exports = router;
