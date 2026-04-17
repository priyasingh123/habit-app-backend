const Habits = require("../models/Habits");

async function addHabit(title) {
  await Habits.create({
    title,
  });
  return getHabits();
}

async function updateHabit(id, updates) {
  await Habits.findByIdAndUpdate(id, updates, { new: true });
  return getHabits();
}

async function getHabits() {
  return await Habits.find({});
}

module.exports = {
  addHabit,
  updateHabit,
  getHabits,
};
