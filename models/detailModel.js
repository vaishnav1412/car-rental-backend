const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
    userName:{
        type:String,
        // required:true,
    },
    pickupLocation: {
        type: String,
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    pickupTime: {
        type: String,
        required: true
    },
    dropOffLocation:{
        type: String,
        required: true
    },
    dropOffDate: {
        type: Date,
        required: true
    },
    dropOffTime: {
        type: String,
        required: true
    },
    pickupHour:{
        type: Number,
        
    },
    pickupMinute:{
        type: Number,
       
    },
    pickupPeriod:{
        type:String,
        
    },
    dropoffHour:{
        type: Number,
        
    },
    dropoffMinute:{
        type: Number,
       
    },
    dropPeriod:{
        type:String,
        
    },


})
 
module.exports = mongoose.model('Details', detailSchema)
