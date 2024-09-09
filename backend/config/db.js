const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongo Db connection has been established!");
    } catch (error) {
        console.log("Mongo Db connection has failed,", error.message);
        throw error
    }
}

module.exports = connectDB;