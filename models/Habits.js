const mongoose = require('mongoose');
const { Schema } = mongoose;

const HabitSchema = new Schema({
    title:{
        type: String,
        required: true,
        //maxLength: 100
    },
    isArchived:{
        type: Boolean,
        default: false
    }
});

const Habits = mongoose.model('Habit', HabitSchema)
module.exports = Habits