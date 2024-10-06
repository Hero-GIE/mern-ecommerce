async function userLogout(req,res){
    try{
        const tokenOption = {
            httpOnly: true,
            secure: true, // Ensure the token is only sent over HTTPS
            sameSite : 'None'
          };
    
          // Clear the "token" cookie to log the user out
        res.clearCookie("token",tokenOption)

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