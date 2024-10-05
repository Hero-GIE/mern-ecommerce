async function userLogout(req,res){
    try{
          // Clear the "token" cookie to log the user out
        res.clearCookie("token")

           // Send success response
        res.json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data : []
        })

    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}


module.exports = userLogout