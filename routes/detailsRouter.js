const express = require('express')

const detailsRouter = express.Router();

const customerDetailsController = require('../controllers/customerDetailsController');

const tryCatchMiddleware = require('../middleware/tryCatchMiddleware');



detailsRouter.post('/cusdetails',tryCatchMiddleware(customerDetailsController.submitDetails))

module.exports = detailsRouter