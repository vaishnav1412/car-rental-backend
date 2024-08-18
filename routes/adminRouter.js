const express = require('express');

const adminRouter = express.Router();

const adminController = require('../controllers/adminController')

const orderController = require('../controllers/orderController')

const tryCatchMiddleware = require('../middleware/tryCatchMiddleware');

const verifyToken = require('../middleware/adminAuthMiddleware')

const upload = require('../middleware/photoUpload')

adminRouter.use(express.json())

adminRouter.post('/login',verifyToken,tryCatchMiddleware(adminController.loginAdmin))
adminRouter.post('/cars',upload,tryCatchMiddleware(adminController.createCars))
adminRouter.get('/cars',tryCatchMiddleware(adminController.getAllCars))
adminRouter.get('/getuser',tryCatchMiddleware(adminController.getUser))
adminRouter.patch('/deletecar',tryCatchMiddleware(adminController.deleteCar))



adminRouter.post('/editcar',tryCatchMiddleware(adminController.editCar))

adminRouter.post('/editcardata',tryCatchMiddleware(adminController.editCarData))
adminRouter.get('/contactmessages',tryCatchMiddleware(adminController.getContactMessage))
adminRouter.put('/users/:id',tryCatchMiddleware(adminController.manageUser))
adminRouter.post('/payments',tryCatchMiddleware(orderController.order))
adminRouter.get('/deals',verifyToken,tryCatchMiddleware(adminController.getOrdersById))








module.exports = adminRouter;