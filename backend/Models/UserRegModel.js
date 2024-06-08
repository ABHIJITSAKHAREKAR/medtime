const mongoose =require('mongoose');

const UserRegSchema=new mongoose.Schema({
//Name,SurName,Age,MobileNo,BloodGrp
    Name:{
        type:String,
        required:true
    },
    Surname:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    MobileNo:{
        type:Number,
        required:true
    },
    BloodGrp:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }

},{timestamps:true});


UserRegSchema.statics.CreateUserReg = async function(Name,Surname,Age,MobileNo,BloodGrp,email) {

    // validation
    if (!Name || !Surname || !Age || !MobileNo || !BloodGrp || !email) {
      throw Error('All fields must be filled')
    }
    
  
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Account already in use')
    }
  
    // const salt = await bcrypt.genSalt(10)
    // const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ Name,Surname,Age,MobileNo,BloodGrp,email });
  
    return user
  }



module.exports=mongoose.model("UserRegistration",UserRegSchema);