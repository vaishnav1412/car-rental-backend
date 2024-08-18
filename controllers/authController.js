const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const Details = require("../models/detailModel");
const Car = require("../models/carSchema");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const randomstring = require("randomstring");
require("dotenv").config();

const createuser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const userExist = await User.findOne({ email: req.body.email });
  console.log(userExist);
  if (userExist) {
    return res.status(400).send({ message: "Given Email is already a user" });
  }

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt);
  req.body.password = hashedPassword;
  const newuser = new User(req.body);
  await newuser.save();
  if (newuser) {
    try {
      const randomNumber = Math.floor(Math.random() * 9000) + 1000;
      otp = randomNumber;
      userMail = req.body.email;
      sentVerifyMail(name, email, otp);
    } catch (error) {
      console.log(error);
    }
  }

  res.status(200).send({ message: "user Created Successfully", success: true });
};

const sentVerifyMail = async (name, email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: "To verify your mail",
      html: `<p> HI ${name} This is the OTP ${otp} to verify your Wheels on Road Account </p>`,
    };

    const info = await transporter.sendMail(mailOption);
    const user = await User.updateOne({ email: email }, { $set: { otp: otp } });

    console.log("email has been sent", info.response);
    console.log(otp);
  } catch (error) {
    console.log(error.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // console.log(req.body);

    if (
      email === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email: email },
        process.env.USER_ACCESS_TOKEN_SECRET
      );
    
      return res.status(200).json({
        status: "adminsuccess",
        message: "admin successfully logged in",
        data: { jwt_token: token },
      });
    }
    
    const user = await User.findOne({ email });

    console.log(req.body.password);
    console.log(user.password);
    console.log(user);

    const isMatch = await bcrypt.compare(req.body.password,user.password);

    console.log(isMatch)
    if (!isMatch) {
    
      throw new Error("Password is not match");
    }

    console.log(isMatch);

   if(user&&isMatch){

    const token = jwt.sign(
      { email: email },
      process.env.USER_ACCESS_TOKEN_SECRET
    );

    const { password: pass, ...rest } = user._doc;

    return res.status(200).json({
      status: "usersuccess",
      message: "user login successful",
      data: token,
      rest: rest,
    });
  }
    else {
      return res.status(404).json({
        status: "error",
        message: "login failed",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const otpcheck = async (req, res) => {
  try {
    const otp = req.body.userInput;
    const data = req.body.email;

    if (otp && data) {
      const user = await User.find({ email: data });
      if (user) {
        if (user[0].otp == otp) {
          const response = await User.updateOne(
            { email: data },
            { $set: { isVerified: true } }
          );
          res.status(200).send({ message: "Please Login", success: true });
        } else {
          console.log("false");
          res.status(200).send({ message: "something wrong", success: false });
        }
      } else {
        res;
      }
    } else {
    }
  } catch (error) {
    console.error("Error fetching user:", error.message);
  }
};
// carByID: async (req,res) =>{
//   const id = req.params.id;
//   const carByID = await this.carByID.findById(id);
//   if(!carByID){
//     return res.status(404).json({error: 'Not Found'});
//   }
//   res.status(200).json({

//     status:'success',
//     message:"successfully fetched car",
//     data:carByID,
//   });
// },

const googlelogin = async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        { id: user.email },
        process.env.USER_ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res
        .status(200)
        .send({ message: "Login Successfull", success: true, data: token });
    } else {
      const user = new User({
        name: name,
        email: email,
        password: 123456,
      });
      const userData = await user.save();
      if (userData) {
        const token = jwt.sign(
          { id: user.email },
          process.env.USER_ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res
          .status(200)
          .send({ message: "Login Successfull", success: true, data: token });
      } else {
        res.status(200).send({ message: "Login failed", success: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const bookDetails = async (req, res) => {
  // console.log(req.body.formData.dropOffLocation);
  console.log(req.body);

  const formData = req.body;

  try {
    const details = new Details({
      pickupLocation: formData.pickupLocation || " ",
      dropOffLocation: formData.dropOffLocation || "",
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      dropOffDate: formData.dropOffDate,
      dropOffTime: formData.dropOffTime || "",
      pickupHour: formData.pickupHour,
      pickupMinute: formData.pickupMinute,
      pickupPeriod: formData.pickupPer,
      dropoffHour: formData.dropoffHour,
      dropoffMinute: formData.dropoffMinute,
      dropPeriod: formData.dropoffPeriod,
    });
    const detailsAdd = await details.save();
    console.log(detailsAdd);

    res.status(200).send({ detailsAdd });
  } catch (error) {
    console.log(error);
  }
};

const getDetails = async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  try {
    const cars = await Car.findOne({ _id: id });
    res.status(200).send({ message: "Data fetched Successfully", cars });
    console.log(cars);
  } catch (error) {
    console.log(error);
  }
};

const forgetpass = async (req, res) => {
  const email = req.body.email;
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      const token = randomstring.generate();
      console.log(token);
      const user = await User.updateOne(
        { email: email },
        { $set: { token: token } }
      );

      sentResetPassword(email, token);
      res
        .status(200)
        .send({ message: "sent email successfully", success: true });
    } else {
      res
        .status(404)
        .send({ message: "User Email is not found", success: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const sentResetPassword = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: "To verify your mail",
      html: `http://localhost:5173/password_change?token=${token}> Please click here to Reset your Password...`,
    };

    const info = await transporter.sendMail(mailOption);

    console.log("email has been sent", info.response);
  } catch (error) {
    console.log(error.message);
  }
};

const changepassword = async (req, res) => {
  const password = req.body.password;
  const token = req.body.queryValues;
  try {
    const userData = await User.findOne({ token: token });
    if (userData) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const updatepassword = await User.findOneAndUpdate(
        { token: token },
        { $set: { password: hashedPassword } }
      );
      if (updatepassword) {
        res
          .status(200)
          .send({ message: "Password is updated successfully", success: true });
      }
    } else {
      res
        .status(404)
        .send({ message: "Something went Wrong while Updating Password..." });
    }
  } catch (error) {
    console.log(error);
  } 
};

module.exports = {
  createuser,
  userLogin,
  googlelogin,
  getDetails,
  bookDetails,
  otpcheck,
  forgetpass,
  changepassword,
};
