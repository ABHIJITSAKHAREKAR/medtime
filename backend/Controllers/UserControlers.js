const User=require('../Models/User');
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, 'MysecretKey', { expiresIn: '3d' })
  }

const LoginUser=async (req,res)=>{

    const {email,password}=req.body;
    try{
        console.log("Login req ",req.body);
        const user=await User.login(email,password);
        const token = createToken(user._id)
        console.log("uesr ",user);
        res.status(200).send({email:user.email,token});

    }catch(e)
    {
        res.status(400).send({error:e.message});
    }

}


const SignupUser=async (req,res)=>{

    const {email,password}=req.body;
    try{

        console.log("Signup req ",req.body);
        const NewUser=await User.signup(email,password);
        const token = createToken(NewUser._id)
        res.status(200).send({email:NewUser.email,token});
    }catch(e)
    {
        res.status(400).send({error:e.message});
    }

}




module.exports = { SignupUser, LoginUser }