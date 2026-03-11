const mongoose = require('mongoose');

async function connectToDB(){
    try {
        await mongoose.connect("mongodb://localhost:27017/habit-app");
        console.log ('connected')
    }catch(e){
        console.log('error occured', e)
    }
}

module.exports = connectToDB;