const mongoose = require('mongoose');

const Contactus = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    ref: {
        type: String, 
        ref: 'User'  
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("contactus messages", Contactus);
