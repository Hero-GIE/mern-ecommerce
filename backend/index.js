const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require("cookie-parser");

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'https://mern-ecommerce-f8ny.vercel.app'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = 8080 || process.env.PORT;

// Connect to MongoDB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("MongoDB connected successfully");
    console.log(`Server is running on localhost ${PORT}`);
  });
});



// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const router = require("./routes");
// const cookieParser = require("cookie-parser");

// // Initialize Express app
// const app = express();

// // Middleware
// const allowedOrigins = [
//   process.env.FRONTEND_URL,      // local frontend
//   'https://mern-ecommerce-f8ny.vercel.app'  // production frontend on Vercel
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api", router);

// const PORT = 8080 || process.env.PORT;

// // Connect to MongoDB
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log("MongoDB connected successfully");
//     console.log(`Server is running on localhost ${PORT}`);
//   });
// });
