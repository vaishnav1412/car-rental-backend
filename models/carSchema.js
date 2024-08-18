const mongoose = require('mongoose');
const carSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },  
    image:{
        type: String,
    },
    model:{
        type: String,
        required: true
    },
    fuel:{
        type:String,
       
    },
    seat:{
        type:Number,
       
    },
    transmission:{
        type:String,
        
    }
})
module.exports = mongoose.model('Car',carSchema);