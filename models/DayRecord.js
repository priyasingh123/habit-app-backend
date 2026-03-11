const mongoose = require('mongoose');
const { Schema } = mongoose;

const DayRecordSchema = new Schema({
    date:{
        type: Date,
        default: Date.now()
    },
    completed:{
        type: Array
    }
})

const DayRecords = mongoose.model('DayRecord', DayRecordSchema);
module.exports = DayRecords