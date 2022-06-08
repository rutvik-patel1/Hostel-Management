const User = require('../models/user.model')
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login  = async(req,res) => { 
    try {
        if (!req.body.email || !req.body.password) {
            res.json({ error: "data not sent properly" });
          }
          // console.log('email logged in',req.body.email)
          const foundUser = await User.findOne({ where : { email: req.body.email } });
        //   console.log("founduser", foundUser);
          if (foundUser) {
            const validPass = await bcrypt.compare(
              req.body.password,
              foundUser.password
            );
            // console.log("valid pass",process.env.SECRET_KEY)
            if (validPass) {
              const token = await jwt.sign(
                { email: req.body.email ,role: foundUser.role },
                // eslint-disable-next-line no-undef
                process.env.SECRET_KEY,
                { expiresIn: "365d" }
              );
              foundUser.token = token;
              await foundUser.save();
              return res.json({ message: "You are authenticated", token: token, role: foundUser.role });
            } else {
             return res.json({ error: "wrong credentials go to hell!!!" });
            }
          } else {
            return res.status(400).json({ error: "account not found" });
          }
    } catch (error) {
        return res.json({message:error.message})
    }   
}

const register  = async(req,res) => { 
    try {
         const { email , password } = req.body
          // console.log(email,password)
          // console.log(!email,!password)
         if (!email && !password) {
            return res.status(400).json({ error: "data not sent properly" });
          }
        const foundUser = await User.findOne({ where : { email: email } })
        // console.log(foundUser)
        if(foundUser) {
            return res.status(400).json({ error: "user already exists, please try login" });
        }
          const newUser = {
            email: req.body.email,
            password: req.body.password,
          };
          
          newUser.password = await bcrypt.hash(newUser.password, 10);
          await User.create(newUser).catch((error)=>{
            return res.status(400).json({message:error.message})
          });

          const resObj = {
            code: 200,
            message: "Registed successfully",
            data: [],
            success: true,
          };
          return res.json(resObj); 

        

    } catch (error) {
        return res.status(400).json({message:error.message})
    }
      
} 

const logout  = (req,res) => { 
    return res.json({message:"logout"})
}

module.exports = { login,register,logout }