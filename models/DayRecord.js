const mongoose = require("mongoose");
const { Schema } = mongoose;

const DayRecordSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
    set: function (date) {
      // Ensure only date part is stored (set time to 00:00:00)
      if (date instanceof Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      }
      return date;
    },
  },
  completed: {
    type: [{ type: Schema.Types.ObjectId, ref: "Habit" }],
    default: [],
  },
});

const DayRecords = mongoose.model("DayRecord", DayRecordSchema);
module.exports = DayRecords;
