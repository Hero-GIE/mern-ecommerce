const userModel = require("../../models/userModel");

async function deleteUserController(req, res) {
  try {
    const { userId } = req.body;

    console.log("User ID received for deletion:", userId);

    // Find and delete the user by ID
    const deletedUser = await userModel.findByIdAndDelete(userId);
    
    console.log("Deleted User:", deletedUser);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    res.json({
      message: "User deleted successfully!",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).json({
      message: error.message || "Failed to delete user",
      error: true,
      success: false,
    });
  }
}

module.exports = deleteUserController;
