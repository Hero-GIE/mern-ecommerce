const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");

// const someOtherPlaintextPassword = "not_bacon";

async function userSignUpController(req, res) {
  try {
    const { name, password, email } = req.body;
    const user = await userModel.findOne({ email });
    // console.log("user", user);
    if (user) {
      throw new Error("User already exit!");
    }

    if (!email) {
      throw new Error("Please provide email!");
    }
    if (!password) {
      throw new Error("Please provide password!");
    }
    if (!name) {
      throw new Error("Please provide name!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
      name
    };

    const userData = new userModel(payload);
    const savedUser = await userData.save();

    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
