const orderModel = require("../../models/orderModel")
const userModel = require("../../models/userModel")

const allOrderController = async (req, res)=>{

    const userId = req.userId
    const user = await userModel.findById(userId)

    if(user.role !== "ADMIN"){
        return res.status(500).json({
            message: "Unauthorized Access"
        })
    }

    const AllOrder = await orderModel.find().sort({createdAt : -1})

    return res.status(200).json({
        data: AllOrder,
        error : false,
        success : true 
    })
}

module.exports = allOrderController
