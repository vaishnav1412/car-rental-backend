const express = require('express')

const authRouter=express.Router()

const authController=require('../controllers/authController');
const couponController=require('../controllers/couponController')
const  trycatchmiddleware  = require('../middleware/tryCatchMiddleware');
const authMiddleware = require('../middleware/authMiddleaware');


authRouter.post('/register',trycatchmiddleware( authController.createuser));
authRouter.post('/login', authController.userLogin);
authRouter.post('/bookdetails',authController.bookDetails);
authRouter.post('/details',authController.getDetails);
authRouter.post('/otpcheck',authController.otpcheck);
authRouter.post('/forgetpass',authController.forgetpass);
authRouter.post('/changepassword',authController.changepassword);
authRouter.post('/applycoupen',couponController.applycoupen)




authRouter.post('/googlelogin',authController.googlelogin);




module.exports = authRouter;