//this router for define that this is router of auth and i will use in app.js or index.js  
const router = require("express").Router(); 
const {registerUserCtrl} = require("../controllers/authController")

// api/auth/register
router.post("/register", registerUserCtrl);

module.exports = router;
