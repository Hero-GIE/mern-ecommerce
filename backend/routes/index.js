const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/users/userSignUpController");
const userSignInController = require("../controller/users/userSignInController");
const userDetailsController = require("../controller/users/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/users/userLogout");
const allUsersController = require("../controller/users/allUsersController");
const updateUserController = require("../controller/users/updateUserController");
const deleteUserController = require("../controller/users/deleteUserController");
const uploadProductController = require("../controller/products/uploadProductController");
const getAllProductController = require("../controller/products/getProductController");
const updateProductController = require("../controller/products/updateProductController");
const getCategoryProductOne = require("../controller/products/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/products/getCategoryWiseProduct");
const getProductDetails = require("../controller/products/getProductDetails");
const addToCartController = require("../controller/users/addToCartController");
const countAddToCartProductController = require("../controller/users/countAddToCartProductController");
const addToCartViewProduct = require("../controller/users/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/users/updateAddToCartProduct");
const deleteCartProduct = require("../controller/users/deleteCartProduct");
const searchProduct = require("../controller/products/searchProduct");
const filterProductController = require("../controller/products/filterProduct");
const paymentController = require("../controller/payment/paymentController");
const webhooks = require("../controller/payment/webHook");
const orderController = require("../controller/payment/orderController");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/user-logout", userLogout);

// admin panel
router.get("/all-user", authToken, allUsersController);
router.post("/update-user", authToken, updateUserController);
router.delete("/deleteUser", authToken, deleteUserController);

// product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getAllProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProductOne);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// user add to cart
router.post("/addToCart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProductController);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteCartProduct);

// payment and order
router.post("/checkout", authToken, paymentController);
router.post("/webhook", webhooks ) 
router.get("/order-list",authToken, orderController ) 

module.exports = router;
