const express = require('express')

const contactusRouter = express.Router();

const contactusController = require('../controllers/contactusController');

const tryCatchMiddleware = require('../middleware/tryCatchMiddleware');




contactusRouter.post('/contactuss',tryCatchMiddleware(contactusController.submitContactus))

module.exports = contactusRouter