const customerDetails = require('../models/CustomerDetailsSchema')


const submitDetails = async (req,res) => {
    const{
        name,
        address,
        district,
        city,
        email,
        phone,
        driverLicenceNumber
    }=req.body;

    try {
        const newDetails = customerDetails.create({
            name,
            address,
            district,
            city,
            email,
            phone,
            driverLicenceNumber
        });
        res.status(200).json({details:newDetails});
    } catch (error) {
        console.log(error);
        res.status(500).send("internel server error")
    }
};
module.exports = {
    submitDetails
}