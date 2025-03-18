const mongoose = require("mongoose");

module.exports = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongo db ^_^");
    } catch (error) {
        console.log("connection failed to Mongo DB !",error);
    }
}