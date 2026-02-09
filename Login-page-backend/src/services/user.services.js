const User= require("./../models/user.model");
const registerUser= async({name,email,password})=>{

    const newUser=new User({name,email ,password});
   await newUser.save();
    return newUser;
};
const findUserByEmail = async(email)=>{
    const user = await User.findOne({email});
    return user;
};
module.exports={registerUser ,findUserByEmail}