const userModel = require("../../models/userModel");

async function allUsersController(req, res) {
  try {
    const allUsers = await userModel.find();

    res.json({
      message: "All User ",
      data: allUsers,
      success: true,
      error: false,
    });
    console.log("userId", req.userId);
  } catch (error) {
    res.status(500).json({
      message: err.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsersController;
