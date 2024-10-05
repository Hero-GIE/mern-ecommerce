const orderModel = require("../../models/orderModel");

const orderController = async (req, res) => {
  try {
   const currentUserId = req.userId

   const orderList = await orderModel.find({userId: currentUserId}).sort({createdAt : -1})


    res.json({
      message: "Order List",
      data: orderList,
      success: true,
      error: false,
    });

  
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = orderController;
