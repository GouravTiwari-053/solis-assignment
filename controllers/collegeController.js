const mongoose = require("mongoose");
const CollegePlacement = require("../models/CollegePlacement");
const CollegeCourse = require("../models/CollegeCourse");
const College = require("../models/College");

exports.getCollegeData = async (req, res) => {
    try {
        const collegeId = new mongoose.Types.ObjectId(req.params.college_id);

        const result = await CollegePlacement.aggregate([
            {
                $match: {
                    college_id: collegeId,
                    highest_placement: { $ne: null, $gt: 0 },
                    average_placement: { $ne: null, $gt: 0 },
                    median_placement: { $ne: null, $gt: 0 },
                    placement_rate: { $ne: null, $gt: 0 }
                }
            },
            {
                $group: {
                    _id: "$year",
                    avg_highest_placement: { $avg: "$highest_placement" },
                    avg_average_placement: { $avg: "$average_placement" },
                    avg_median_placement: { $avg: "$median_placement" },
                    avg_placement_rate: { $avg: "$placement_rate" }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id",
                    avg_highest_placement: { $round: ["$avg_highest_placement", 2] },
                    avg_average_placement: { $round: ["$avg_average_placement", 2] },
                    avg_median_placement: { $round: ["$avg_median_placement", 2] },
                    avg_placement_rate: { $round: ["$avg_placement_rate", 2] }
                }
            },
            { $sort: { year: 1 } },
            {
                $group: {
                    _id: null,
                    allYears: { $push: "$$ROOT" }
                }
            },
            {
                $addFields: {
                    lastTwo: { $slice: ["$allYears", -2] }
                }
            },
            {
                $addFields: {
                    firstPlacementRate: { $arrayElemAt: ["$lastTwo.avg_placement_rate", 0] },
                    secondPlacementRate: { $arrayElemAt: ["$lastTwo.avg_placement_rate", 1] }
                }
            },
            {
                $addFields: {
                    placement_trend: {
                        $cond: [
                            { $gt: ["$secondPlacementRate", "$firstPlacementRate"] },
                            "UP",
                            "DOWN"
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    avg_section: "$allYears",
                    placement_section: {
                        placement_trend: "$placement_trend",
                        data: "$allYears",
                    }
                }
            }
        ]);

        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getCollegeCourses = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const collegeId = req.params.college_id;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const courses = await CollegeCourse.aggregate([
            {
                $match: {
                    college_id: new mongoose.Types.ObjectId(collegeId)
                }
            },
            {
                $sort: { course_fee: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: parseInt(limit)
            }
        ]);

        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getCollegesByFilter = async (req, res) => {
    try {
        const { city, state } = req.query;

        const matchConditions = [];

        if (city) {
            matchConditions.push({ "cityDetails.name": city });
        }

        if (state) {
            matchConditions.push({ "stateDetails.name": state });
        }

        const result = await College.aggregate([
            {
                $lookup: {
                    from: "cities",
                    localField: "city_id",
                    foreignField: "_id",
                    as: "cityDetails"
                }
            },
            { $unwind: "$cityDetails" },
            {
                $lookup: {
                    from: "states",
                    localField: "state_id",
                    foreignField: "_id",
                    as: "stateDetails"
                }
            },
            { $unwind: "$stateDetails" },
            {
                $match: matchConditions.length > 0 ? { $and: matchConditions } : {}
            },
            {
                $project: {
                    name: 1,
                    address: 1,
                    city: "$cityDetails.name",
                    state: "$stateDetails.name",
                }
            }
        ]);

        res.status(200).json(result);
    } catch (err) {
        console.error("Error filtering colleges:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

