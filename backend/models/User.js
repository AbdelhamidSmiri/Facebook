const mongoose = require("mongoose");

const Joi = require("joi");

// User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true, // for remove space from begin and end 
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
    unique: true, // unique value on database
  },
  password: { type: String, required: true, trim: true, minlength: 8 },
  profilePhoto: {
    type: Object,
    default: {  //for difine the default image 
      url: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      publicId: null,
    },
  },
  bio: {
    type: String,
  },
  isAdmin : {
    type:Boolean,
    default:false,
  },
  isAccountVerified : {
    type:Boolean,
    default:false,
  }
},{
    timestamps:true, // for add Updated_at created_at fields automatically
});


// user model 
const User = mongoose.model("User",UserSchema);

// Validate register User
function validateRegisterUser(obj){
    const schema = Joi.object({
        username : Joi.string().min(2).max(100).required(),
        email : Joi.string().trim().min(5).max(100).required().email(),
        password : Joi.string().trim().min(5).required(),
    });
    return schema.validate(obj);
}

module.exports = {
    User,
    validateRegisterUser
}
