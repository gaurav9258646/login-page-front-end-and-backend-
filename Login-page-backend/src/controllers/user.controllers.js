const { registerUser, findUserByEmail } = require("./../services/user.services");
const {generateToken,comparePassword, hashpassword}=require("./../utils/index")

const  register= async(req,res)=>{
    const {name,email,password} =req.body;

    if(!name || !email || !password){
        return res.json({
            success:false,
            error:"All fields are required",
        });
    }
    try{
        // hash password
        const hashPswd= await hashpassword(password);
    const user= await registerUser({name,email,password:hashPswd});

    // removed password
     user.password=undefined;
     user.__v=undefined;

        return res.json({
            success:true,
            data:user,
            message:"user register successfully"
        });
    } catch(error){
        if(error.code===11000){
            return res.json({
                success:false,
                error:"user already exists!",
            });
        }

        return res.json({
            success:false,
            error:"user registeration falied",
        });
    }
};
const login= async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
       return res.json({
        success:false,
        error:"email or password is required"
       });
    }
    try{
        const user=await findUserByEmail(email);
        if(!user){
            return res.json({
                success:false,
                error:"user does't exist!"
            })
        }
        const isValid=await comparePassword(password,user.password);
        if(!isValid){
            return res.json({
                success:false,
                error:"wrong password"
            });
        }
        user.password=undefined;
        // generate token
        
        const { accessToken, refreshToken } = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role:user.role,
    });


        return res.json({
            success:true,
            message:"user loggedin successfully",
            data:{user, accessToken,refreshToken},
        });
    } catch(error){
        console.log(error);
        return res.json({
            success:false,
            error:"something went wrong ",
        });
    }
};

module.exports={register,login}