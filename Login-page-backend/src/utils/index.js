
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const generateSlug=(name)=>{
  
    return name .toLowerCase().trim().replace(/\s+/g,"-").replace(/[^a-z0-9/-]/g, "");
  };

  const generateToken=(data)=>{
    const accessToken= jwt.sign(data,process.env.JWT_SECRET,{expiresIn:"30d"});
    const refreshToken= jwt.sign(data,process.env.JWT_SECRET,{expiresIn:"30d"});
    return {accessToken,refreshToken};
  };

  const verifyToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
  };

  const hashpassword=(password)=>{
    return bcrypt.hash(password,12);
  };

  const comparePassword=(password,hashpassword)=>{
    return bcrypt.compare(password,hashpassword);

  };

  module.exports={generateSlug,generateToken,verifyToken,hashpassword,comparePassword}