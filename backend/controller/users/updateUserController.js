const userModel = require("../../models/userModel");

async function updateUserController(req, res) {
  try {
    const { userId, email, name, role } = req.body;

    console.log("User ID received:", userId);

    const user = await userModel.findById(userId);
    console.log("User before update:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const payload = {
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),
    };

    const updateUser = await userModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    console.log("User after update:", updateUser);

    res.json({
      data: updateUser,
      message: "User updated successfully!",
      success: true,
      error: false,
    });
    
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUserController;

