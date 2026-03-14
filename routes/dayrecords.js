const express = require("express");
const DayRecord = require("../models/DayRecord");

const router = express.Router();

// API to create new day record
router.post("/dayrecords", async (req, res) => {
  try {
    const { date, completed } = req.body;
    const [year, month, day] = date.split("-").map(Number);
    const recordDate = new Date(year, month - 1, day).toLocaleDateString(
      "en-CA",
    );
    const today = new Date();

    if (today < new Date(recordDate)) {
      return res.status(400).json({
        message: "Cannot create record for a future date",
      });
    }

    const dayRecord = await DayRecord.findOneAndUpdate(
      { date: recordDate },
      { date: recordDate, completed: completed || [] },
      { upsert: true, new: true },
    );
    res.status(200).json(dayRecord);
  } catch (e) {
    res.status(500).json({
      message: "Error in creating or updating day record",
      error: e.message,
    });
  }
});

// API to get all day records for a month
router.get("/dayrecords", async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        message: "Month and year are required query parameters",
      });
    }

    const startDate = new Date(year, month - 1, 1);
    let endDate = new Date(year, month, 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (endDate > today) {
      endDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
      );
    }

    const dayRecords = await DayRecord.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    }).sort({ date: 1 });

    res.status(200).json(dayRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching day records", error });
  }
});

// API to get day record by date
router.get("/dayrecords/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const d = new Date(date).toLocaleDateString("en-CA");

    const dayRecord = await DayRecord.findOne({
      date: d,
    });

    if (!dayRecord) {
      return res.status(404).json({ message: "No record found for this date" });
    }

    res.status(200).json(dayRecord);
  } catch (error) {
    res.status(500).json({ message: "Error fetching day record", error });
  }
});

module.exports = router;
