const mongoose = require('mongoose');

const CustomerDetailsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true 
    },
    driverLicenceNumber: {
        type: Number, 
        required: true
    }
});

module.exports = mongoose.model('customerDetails', CustomerDetailsSchema);
