const mongoose =require('mongoose');
const validator = require('validator')

const UserSchema=new mongoose.Schema({
//Name,SurName,Age,MobileNo,BloodGrp
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

},{timestamps:true});


UserSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough')
    }
  
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }
  
    // const salt = await bcrypt.genSalt(10)
    // const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ email, password })
  
    return user
  }

  UserSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }

    if (user.password!=password) {
      throw Error('Incorrect password')
    }
  
    return user
  }
  

module.exports=mongoose.model("User",UserSchema);