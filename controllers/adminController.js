const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const car = require("../models/carSchema");
const userSchema = require("../models/userSchema");
const carSchema = require("../models/carSchema");
const contactusSchema = require("../models/contactusSchema");
const paymentSchema = require("../models/paymentSchema")


require("dotenv").config();

module.exports = {
  loginAdmin: async (req, res) => {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const admin_token = jwt.sign(
        { username: username },
        process.env.ADMIN_ACCESS_TOKEN_SECRET
      );
      res
        .status(200)
        .send({ message: "Login Successfull", success: true, data: admin_token });



    } else {
      return res.status(404).json({
        status: "error",
        message: "admin logged in failed",
      });
    }
  },

 createCars: async (req, res) => {
    const {
      title,
      description,
      price,
      image,
      model,
      seat,
      fuel,
      transmission,
    } = req.body;

    const cars = await car.create({
      title,
      description,
      price,
      image,
      model,
      seat,
      fuel,
      transmission,
    });

    if (!cars) {
      return res.status(404).json({ error: "Car not created" });
    }

    res.status(201).json({
      status: "success",
      message: "Successfully created car",
    });
  },

  getAllCars: async (req, res) => {
    const allcars = await car.find();
    res.status(200).json({
      status: "success",
      message: "successfully fetched",
      data: allcars,
    });
  },

  viewCarById: async (req, res) => {
    const carId = req.params.id;

    const car = await car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: "car not found" });
    }
    res.status(200).json({
      status: "success",
      message: "successfully fetched car",
    });
  },

  deleteCar: async (req, res) => {
    const carId = req.body.carId;
    console.log(req.body.carId);

    const response = await car.findByIdAndDelete(carId);

    console.log(response);
    if (response) {
      res.status(200).json({
        status: "success",
        message: "successfully deleted car",
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "some error occurred",
      });
    }
  },
  getUser: async (req, res) => {
    const users = await userSchema.find();
    res.json(users);
  },

  editCar: async (req, res) => {
    let id = req.body.id;

    if (id) {
      const responce = await carSchema.findOne({ _id: id });

      if (responce) {
        res.status(200).json({
          status: "success",
          data: responce,
        });
      } else {
        res.status(200).json({
          status: "failed",
          message: "something went wrong1",
        });
      }
    } else {
      res.status(200).json({
        status: "failed",
        message: "something went wrong",
      });
    }
  },

  editCarData: async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const id = req.body.carId;
    
    let isEdited = false;

    if (title != "") {
      isEdited = true;
      const responce = await carSchema.updateOne(
        { _id: id },
        { $set: { title: title } }
      );
    }

    if (description != "") {
      isEdited = true;
      const responce = await carSchema.updateOne(
        { _id: id },
        { $set: { description: description } }
      );
    }

    if (price != 0) {
      isEdited = true;
      const responce = await carSchema.updateOne(
        { _id: id },
        { $set: { price: price } }
      );
    }
    if (isEdited) {
      res.status(200).json({
        success: true,
        message: "successfully edited",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "You dont make any edit",
      });

    }
  },
  getContactMessage: async (req,res)=>{
    const message = await contactusSchema.find()
    console.log(message);
    res.status(200).json(message)
 },
 manageUser:async (req,res)=>{
  const id = req.params.id;
  const updateData=req.body;
  const user = await User.findOne({_id:id});
  if(!user){
    return res.status(404).json({
      status:'error',
      message:'No Such User'
    })
  }
  await User.findbyIdAndUpdate(id,{$set:updateData});
  res.status(201).json({
    status:'success',
    message:'successfully updated user'
  });
 },
 getOrdersById: async (req, res) => {


  try {


   let email = req.username
   
  const user = await userSchema.findOne({email})
  
  const order = await paymentSchema.find({userId:user._id})

    
    if (!order) {
      return res.status(404).json({ error: "Order not found" }); 
    }
    
    res.status(200).send({
      status: "success",
      message: "Successfully fetched orders",
      data:order 
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
};
