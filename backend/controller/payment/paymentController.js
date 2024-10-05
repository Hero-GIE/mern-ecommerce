const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const user = await userModel.findOne({ _id: req.userId });

    // Correct Conversion rate from GHS to USD
    const GHS_TO_USD_CONVERSION_RATE = 0.0634; // 1/15.78

    // Function to convert GHS amount to USD cents with slight adjustment
    const convertToUSD = (amountInGhs) => {
      let usdAmount = amountInGhs * GHS_TO_USD_CONVERSION_RATE;
      usdAmount = usdAmount * 0.98; // Subtract 2% to counter small overage
      return Math.floor(usdAmount * 100); // Convert to cents and round down
    };

    // Check your Stripe dashboard for the correct shipping rate ID
    const shippingRateId = "shr_1Q2wuALpzMyQkkDzPn7yi2oh"; // Replace with your actual shipping rate ID

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: shippingRateId }],
      customer_email: user.email,
      metadata: {
      userId : req.userId
      },
      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage,
              metadata: { productId: item.productId._id },
            },
            unit_amount: convertToUSD(item.productId.sellingPrice), // Convert GHS price to USD cents with adjustment
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(303).json(session);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
