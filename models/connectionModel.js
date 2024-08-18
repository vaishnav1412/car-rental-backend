const mongoose = require('mongoose')

const Connection = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    adminId:{
        type:String,
        required:true
    },
    lastMessage:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

exports.module = mongoose.model("connection",Connection)