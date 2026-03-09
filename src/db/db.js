const mongoose =   require("mongoose");

function connectDB(){
    mongoose.connect("mongodb://localhost:27017/Blog").then(() => console.log("Mongo db Connected "))
}
module.exports = connectDB;
