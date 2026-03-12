const express = require("express");
const Habits = require("../models/Habits");

const router = express.Router();

// API to create new habit
router.post("/new-habit", async (req, res) => {
  try {
    const { title } = req.body;
    await Habits.create({
      title,
    });
    const habits = await Habits.find({});
    res.status(201).json(habits);
  } catch (e) {
    res.status(500).json({
      message: "Error in creating habit",
      error: e.message,
    });
  }
});

//API to delete an existing habit
router.patch("/delete-habit", async (req, res) => {
  try {
    const { id } = req.body;
    const habit = await Habits.findByIdAndUpdate(
      id,
      { isArchived: true },
      { new: true },
    );

    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ message: "Error archiving habit", error });
  }
});

// API to get all habits
router.get("/allhabits", async (req, res) => {
  try {
    const habits = await Habits.find({ isArchived: false });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Habits", error });
  }
});

module.exports = router;
