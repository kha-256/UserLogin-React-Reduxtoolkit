const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require('./db/User');
const jwt = require('jsonwebtoken'); // Import the JWT library
const crypto = require('crypto'); // Import the crypto module for generating the secret key
const app = express();


app.use(express.json());

// Enable CORS with specific options
const corsOptions ={
  origin:'*', 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  exposedHeaders: "Custom-Header1, Custom-Header2",
}
app.use(cors(corsOptions)) // Use this after the variable declaration


const secretKey = crypto.randomBytes(32).toString('hex');

console.log("Secret Key:", secretKey);

app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    console.log("Login Request Body:", req.body); // Add this line to log the request body

    try {
      let user = await User.findOne(req.body).select("-password");
      console.log("MongoDB Query:", user); // Add this line to log the MongoDB query result

      if (user) {
        // If the user is found, create a token and include it in the response
        const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });

        // Return the user data and the token in the response
        resp.json({ user, token });
      } else {
        // If the user is not found, return an error response with status 401 (Unauthorized)
        resp.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      resp.status(500).send("An error occurred during login.");
    }
  } else {
    resp.status(400).json({ error: "Email and password are required" });
  }
});


app.listen(5000);

