const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User ,validateRegisterUser} = require("../models/User");

/**----------------------------------
 * @desc  Register new User sign up
 * @router  /api/auth/register
 * @method Post
 * @access public
 * 
 -------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async (req,res)=>{
    // validation (i did it in model User.js and i get it from there)
    const {error} = validateRegisterUser(req.body);
    
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    // check if is user already exists
    let user = await User.findOne({email:req.body.email});
    if (user){
        return res.status(400).json({message:"This user is already exist"});
    }
    // for crypt the password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    // if not exist hash pass and save it to DB

    user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
    })
    await user.save();
    // Send a response to client

    res.status(201).json({message:"you registred successfully,Please login"});
});



