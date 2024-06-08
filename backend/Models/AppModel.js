const mongoose =require('mongoose');

const AppointmentSchema=new mongoose.Schema({

    date:{
        type:Date,
        required:true
    },
    str:{
        type:String,
        required:true
    },
    slot:{
        type:[Number],
        required:true
    },
    Drcode:{
        type:String,
        required:true
    }

},{timestamps:true});

module.exports=mongoose.model("appointment",AppointmentSchema);