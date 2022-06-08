const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function verifyToken(req, res, next) {
  
  try {
    var token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
    //   console.log("adgfsdggfgfg",process.env.SECRET_KEY)
      // eslint-disable-next-line no-undef
      const payload = jwt.verify(token, process.env.SECRET_KEY);
    //   console.log(payload);
      if (payload) {
        const foundUser = await User.findOne({where:{ email: payload.email }});
        // console.log(foundUser);
        if (!foundUser) {
          return res.status(403).json({ message: "Invalid user" });
        }
        // if (foundUser.token != token) {
        //   res.status(403).json({ message: "Invalid token" });
        // }
        req.useremail = foundUser.email;
        req.role = foundUser.role;
        return next();
      } else {
        return res.status(403).json({ message: "Invalid token" });
      }
    } else {
      return res.status(403).json({ message: "Token not found !!" });
    }
  } catch (error) {
    // console.log("in cache",error.message);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = verifyToken;
