const coupen = require("../models/couponSchema");
const details = require("../models/detailModel");

const addCoupon = async (req, res) => {
  const { code, discountType, discountAmount, expirationDate } = req.body;

  const newCoupon = new coupon({});
};
const applycoupen = async (req, res) => {
  try {
    const coupen = req.body.coupen;
    const price = req.body.totalAmount;
    const userId = req.body.userId;
    const firstRide = "FSTR666";
    const fifthRide = "HAADV666";
    const weekend = "WKND666";
    let grandTotal;

    if (coupen === firstRide) {
      grandTotal = price / 2;
      res.status(200).send({ message: "coupen applied", success: true, grandTotal:grandTotal,coupenstatus:'applied'});
    } else if (coupen === fifthRide) {
      grandTotal = price - (price * 15) / 100;
      res.status(200).send({ message: "coupen applied", success: true , grandTotal:grandTotal,coupenstatus:'applied'});
    } else if (coupen === weekend) {
      grandTotal = price - (price * 5) / 100;
      res.status(200).send({ message: "coupen applied", success: true , grandTotal:grandTotal,coupenstatus:'applied'});
    } else {
      res.status(200).send({ message: "coupen is not valid", success: false });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addCoupon,
  applycoupen,
};
