const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
  try {
    const getAllProduct = await productModel.find().sort({createdAt : -1});
    
    res.status(400).json({
      message: "Product retrieved successfully",
      error: false,
      success: true,
      data: getAllProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductController;
