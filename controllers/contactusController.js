const Contactus = require('../models/contactusSchema')

const submitContactus = async (req, res) => {
  const{
    firstName ,
    lastName ,
    email, 
    message,
    ref,
  }= req.body;

  try {
    const newContact = Contactus.create({
      firstName ,
      lastName ,
      email, 
      message,
      ref
    });

    // const savedContact = await newContact.save();
    res.status(200).json({ details: newContact });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  submitContactus,
};
