const addToCartModel = require("../../models/cartProduct");

const countAddToCartProductController = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await addToCartModel.countDocuments({
      userId: userId,
    });
    res.json({
      data: {
        count: count,
      },
      message: "OK",
      error: false,
      success: true,
    });
  }
   catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = countAddToCartProductController