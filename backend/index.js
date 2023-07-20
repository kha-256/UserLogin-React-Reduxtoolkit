const express = require("express");
const cors = require("cors");
require('./db/config');
const User= require('./db/User');
const app = express();

app.use(express.json());
// Enable CORS for all routes in postman
app.use(cors());


app.post("/login",async (req, resp)=>{
  
  if(req.body.email && req.body.password){

    let user= await User.findOne(req.body).select("-password");
    if(user){
      resp.send(user);
    }
    else{
      resp.send("No user found")
    }
  }
  else{
    resp.send("No user found")
  }
  
  
})

app.listen(5000) 

{/*
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Users', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const dataSchema = new mongoose.Schema({});

    const data = mongoose.model('datas', dataSchema);

  
    const newData = await data.find();
    console.warn(newData);
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log('Server started on port 5000');
    });
  } catch (error) {
    console.error('Error starting the server:', error.message);
  }
};

startServer(); */}