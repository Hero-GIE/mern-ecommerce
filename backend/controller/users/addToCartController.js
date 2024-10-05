const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

    console.log("IsProductAvailable  ", isProductAvailable)

    if (isProductAvailable) {
      return res.json({
        message: "Already added to Cart",
        success: false,
        error: true
      });
    }
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payload)
    const saveProduct = await newAddToCart.save()

    res.json({
      data: saveProduct,
      message: "Product added to Cart",
      error: false,
      success: true,
    });

  } 
  catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
