const express = require('express');
const Auth=require('../Middleware/Auth')
const {RegUser,GetRegUser,DeleteRegUser,getApp,bookApp} =require("../Controllers/SecureControlers")
const router=express.Router();

router.use(Auth)

router.post('/register',RegUser);

router.post('/register/getuser',GetRegUser);
router.post('/register/deleteuser',DeleteRegUser);
router.post('/getapp',getApp);
router.post('/bookapp',bookApp);

module.exports=router
