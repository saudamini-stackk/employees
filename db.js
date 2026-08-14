const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://2025saudamini_db_user:ZZqFk3Yhvj5ePxSN@itm.gppsn5g.mongodb.net/?appName=itm")

const db = mongoose.connection;

db.on("connected",()=>{
console.log("MongoDB successfully connected")
});

db.on("disconnected",()=>{
console.log("MongoDB disconnected")
});

db.on("error",(error)=>{
console.log("MongoDB connection error:" ,error);
});

module.exports = db;