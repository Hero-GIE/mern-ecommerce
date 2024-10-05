// const userModel = require("../../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// async function userSignInController(req, res) {
//   try {

//     const { email, password} = req.body;

//     if (!email) {
//       throw new Error("Please provide email!");
//     }
//     if (!password) {
//       throw new Error("Please provide password!");
//     }
    
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       throw new Error("User not found!");
//     }

//     const checkPassword = await bcrypt.compare(password, user.password);
//     // console.log("checkPassword", checkPassword);

//     if (checkPassword) {
//       const tokenData = { _id: user._id, email: user.email };

//       const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
//         expiresIn: 60 * 60 * 8,
//       });

//       const tokenOption = {
//         httpOnly: true,
//         secure: true,
//       };

//       res.cookie("token", token, tokenOption).status(200).json({
//         message: "Login Successfully",
//         data: token,
//         success: true,
//         error: false,
//       });
//     } 
//     else {
//       throw new Error("Incorrect password!");
//     }
//   } catch (err) {
//     res.json({
//       message: err.message || err,
//       error: true,
//       success: false,
//     });
//   }
// }

// module.exports = userSignInController;






const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email) {
      throw new Error("Please provide email!");
    }
    if (!password) {
      throw new Error("Please provide password!");
    }

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found!");
    }

    // Check if the provided password matches the stored hashed password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      // Include user role in token payload
      const tokenData = { _id: user._id, email: user.email, role: user.role };  // Adding user role

      // Sign the token with a secret key and set an expiration time
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8, // Token expires in 8 hours
      });

      const tokenOption = {
        httpOnly: true,
        secure: true, // Ensure the token is only sent over HTTPS
      };

      // Send the token in the cookie and respond with success
      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Incorrect password!");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
