const mongoose = require("mongoose");
require("dotenv").config();

const State = require("./models/State");
const City = require("./models/City");
const College = require("./models/College");
const CollegePlacement = require("./models/CollegePlacement");
const CollegeCourse = require("./models/CollegeCourse");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/solis-assignment";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    const mp = await State.create({ name: "Madhya Pradesh" });
    const up = await State.create({ name: "Uttar Pradesh" });

    const bhopal = await City.create({ name: "Bhopal" });
    const indore = await City.create({ name: "Indore" });
    const lucknow = await City.create({ name: "Lucknow" });
    const allahabad = await City.create({ name: "Allahabad" });

    const college1 = await College.create({
      name: "NIT Bhopal",
      score: 850,
      city_id: bhopal._id,
      state_id: mp._id,
    });

    const college2 = await College.create({
      name: "IIT Kanpur",
      score: 980,
      city_id: lucknow._id,
      state_id: up._id,
    });

    const college3 = await College.create({
      name: "NIT Allahabad",
      score: 930,
      city_id: allahabad._id,
      state_id: up._id,
    });

    const college4 = await College.create({
      name: "IET Indore",
      score: 790,
      city_id: indore._id,
      state_id: mp._id,
    });

    const college5 = await College.create({
      name: "LNCT Bhopal",
      score: 770,
      city_id: bhopal._id,
      state_id: mp._id,
    });

    const college6 = await College.create({
      name: "Amity Lucknow",
      score: 720,
      city_id: lucknow._id,
      state_id: up._id,
    });


    await CollegePlacement.insertMany([
      {
        college_id: college1._id,
        year: 2021,
        highest_placement: 21,
        average_placement: 9,
        median_placement: 8,
        placement_rate: 83,
      },
      {
        college_id: college1._id,
        year: 2022,
        highest_placement: 22,
        average_placement: 10,
        median_placement: 9,
        placement_rate: 85,
      },
      {
        college_id: college1._id,
        year: 2023,
        highest_placement: 24,
        average_placement: 11,
        median_placement: 10,
        placement_rate: 88,
      },
      {
        college_id: college2._id,
        year: 2021,
        highest_placement: 33,
        average_placement: 17,
        median_placement: 15,
        placement_rate: 90,
      },
      {
        college_id: college2._id,
        year: 2022,
        highest_placement: 35,
        average_placement: 18,
        median_placement: 16,
        placement_rate: 92,
      },
      {
        college_id: college2._id,
        year: 2023,
        highest_placement: 38,
        average_placement: 19,
        median_placement: 17,
        placement_rate: 95,
      },
      {
        college_id: college3._id,
        year: 2022,
        highest_placement: 28,
        average_placement: 16,
        median_placement: 15,
        placement_rate: 88,
      },
      {
        college_id: college3._id,
        year: 2023,
        highest_placement: 30,
        average_placement: 17,
        median_placement: 16,
        placement_rate: 90,
      },
      {
        college_id: college4._id,
        year: 2022,
        highest_placement: 20,
        average_placement: 11,
        median_placement: 10,
        placement_rate: 78,
      },
      {
        college_id: college4._id,
        year: 2023,
        highest_placement: 21,
        average_placement: 12,
        median_placement: 11,
        placement_rate: 80,
      },
      {
        college_id: college5._id,
        year: 2022,
        highest_placement: 17,
        average_placement: 8,
        median_placement: 7,
        placement_rate: 76,
      },
      {
        college_id: college5._id,
        year: 2023,
        highest_placement: 18,
        average_placement: 9,
        median_placement: 8,
        placement_rate: 78,
      },
      {
        college_id: college6._id,
        year: 2022,
        highest_placement: 15,
        average_placement: 7,
        median_placement: 6,
        placement_rate: 72,
      },
      {
        college_id: college6._id,
        year: 2023,
        highest_placement: 16,
        average_placement: 8,
        median_placement: 7,
        placement_rate: 75,
      },
    ]);

    await CollegeCourse.insertMany([
      { college_id: college1._id, course_name: "B.Tech", course_duration: "4 years", course_fee: 120000 },
      { college_id: college1._id, course_name: "M.Tech", course_duration: "2 years", course_fee: 80000 },
      { college_id: college1._id, course_name: "MBA", course_duration: "2 years", course_fee: 150000 },
      { college_id: college2._id, course_name: "B.Tech", course_duration: "4 years", course_fee: 130000 },
      { college_id: college2._id, course_name: "MCA", course_duration: "3 years", course_fee: 140000 },
      { college_id: college2._id, course_name: "PhD", course_duration: "5 years", course_fee: 100000 },
      { college_id: college3._id, course_name: "B.Tech", course_duration: "4 years", course_fee: 110000 },
      { college_id: college3._id, course_name: "M.Tech", course_duration: "2 years", course_fee: 90000 },
      { college_id: college4._id, course_name: "B.E.", course_duration: "4 years", course_fee: 100000 },
      { college_id: college4._id, course_name: "MBA", course_duration: "2 years", course_fee: 130000 },
      { college_id: college5._id, course_name: "BBA", course_duration: "3 years", course_fee: 110000 },
      { college_id: college5._id, course_name: "BCOM", course_duration: "3 years", course_fee: 100000 },
      { college_id: college6._id, course_name: "BCA", course_duration: "3 years", course_fee: 105000 },
      { college_id: college6._id, course_name: "MBA", course_duration: "2 years", course_fee: 125000 },
    ]);

    console.log("Dummy data inserted");
    process.exit();
  } catch (err) {
    console.error("Error while seeding data", err);
    process.exit(1);
  }
}

seed();