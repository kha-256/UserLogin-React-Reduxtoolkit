const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require('./db/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();

app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  exposedHeaders: "Custom-Header1, Custom-Header2",
}
app.use(cors(corsOptions));

const secretKey = crypto.randomBytes(32).toString('hex');

console.log("Secret Key:", secretKey);

app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    console.log("Login Request Body:", req.body);

    try {
      let user = await User.findOne(req.body).select("-password");
      console.log("MongoDB Query:", user);

      if (user) {
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        resp.json({ user, token });
      } else {
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

app.post("/signup", async (req, resp) => {
  if (req.body.name && req.body.email && req.body.password) {
    console.log("Signup Request Body:", req.body);

    try {
      let existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        resp.status(409).json({ error: "User with this email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        let savedUser = await newUser.save();
        savedUser = savedUser.toObject();
        delete savedUser.password;

        resp.json({ user: savedUser });
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      resp.status(500).send("An error occurred during signup.");
    }
  } else {
    resp.status(400).json({ error: "Name, email, and password are required" });
  }
});

app.listen(5000);
