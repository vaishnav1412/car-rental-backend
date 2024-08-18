const payment = require('../models/paymentSchema');
const User = require('../models/userSchema');

const order = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.body?.currentUser?.rest?._id;
    const user = await User.findById(userId);

    const orderDetails = new payment({
      userId: user._id,
      userName: user.name,
      paymentId: req.body.payment_id,
      carName: req.body.car.title,
      totalAmount: req.body.updatedPrice,
      date: new Date(),
      status: 'success',
      history: 'pending',
    });

    const orderAdded = await orderDetails.save();
    console.log(orderAdded);

    return res.status(200).json({
      status:"success",
    })
  } catch (error) {
    console.error('Error saving order:', error.message);
  }
};

module.exports = {
  order,
};
