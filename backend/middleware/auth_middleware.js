import jwt from "jsonwebtoken";

const ensureValidation = (req, res, next) => {
  const auth = req.headers["authorization"];
 if(!auth){
    res.status(401).json({
        success:"failed",
        message:"JWT token is required!"
    })
 }
 const token=auth.split(" ")[1]

 var decodedUserInfo = jwt.verify(token,process.env.JWT_SECRET);
 console.log(decodedUserInfo);

 req.userInfo=decodedUserInfo;
 

  next();
};

export { ensureValidation };
