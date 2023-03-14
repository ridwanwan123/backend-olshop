const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: string, 
    require: true, 
  },
  email: {
    type: string, 
    require: true,
    unique:true
  },
  email: {
    type: string, 
    require: true,
  },
});

const User = mongoose.model("User", userSchema)

exports.User = User;