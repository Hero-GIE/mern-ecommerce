const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    // Get token from cookies or Authorization header
    let token = req.cookies?.token;

    // Fallback to Authorization header if token is not in cookies
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7, authHeader.length); // Remove "Bearer " from the string
      }
    }

    console.log("token", token);

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "No token provided. Please login.",
        error: true,
        success: false,
      });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decode) {
      if (err) {
        console.log("JWT Verification Error", err);
        return res.status(403).json({
          message: "Invalid token. Please login again.",
          error: true,
          success: false,
        });
      }

      console.log("decode", decode);

      // Token is valid, attach decoded payload to request
      req.userId = decode?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;




