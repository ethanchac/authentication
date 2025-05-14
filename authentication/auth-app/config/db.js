const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo connected");
    }catch(err){
        console.log("no connection", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;