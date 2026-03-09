const express =  require("express")
const jwt=  require("jsonwebtoken")
const bcrypt =  require("bcryptjs")
const User =  require("../models/user")
const router =  express.Router();


// register 
router.post('/register',async (req,res) => {
    const { name ,  email ,  password }   = req.body;

    console.log("Register - received password:", password);
    
    const hashedPassword =  await bcrypt.hash(password,10)
    
    console.log("register - hashed password:", hashedPassword);
    
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
     
    console.log("User saved with password:", user.password);
    
    const token  = jwt.sign({email:user.email},"secretkey",{ expiresIn : "1h"});
    
    res.json({
        message : "User registered", token:token 
    });
})

//login

router.post('/login',async (req,res) => {
     const {email,password}=  req.body;

     console.log("Login attempt for:", email);
     
     const user =  await User.findOne({email})

     console.log("User found:", user);

     if(!user){
        return res.json({message :  "User not found - register first" });
     }

     const isMatch = await bcrypt.compare(password, user.password);
     
     console.log("Password match:", isMatch);
     
     if(!isMatch){
        return res.json({message :  "Wrong password" });
     }
     
     const token = jwt.sign({email:user.email},"secretkey",{ expiresIn : "1h"});
     res.json({message:"login successful", token:token})
})


module.exports = router;