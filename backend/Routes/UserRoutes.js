const express = require('express');
const {LoginUser,SignupUser}=require('../Controllers/UserControlers')

const router=express.Router();


router.post('/login',LoginUser);

router.post('/signup',SignupUser);



module.exports=router
