const mongoose = require('mongoose')

const message = new mongoose.Schema({
    fromId:{
        type:String,
        required:true
    },
    toId:{
        type:String,
        required: true
    },
    connectionId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

exports.module = mongoose.model("messages",message)