const UserReg =require('../Models/UserRegModel');
const AppModel = require('../Models/AppModel');

const {helper,dateobjtostr}=require('../Controllers/helper')



const RegUser = async (req, res) => {

    const { Name,Surname,Age,MobileNo,BloodGrp,email}=req.body;
    console.log("f1");
    try {
        console.log("Register req ", req.body);

        const user=await UserReg.CreateUserReg(Name,Surname,Age,MobileNo,BloodGrp,email);
        res.status(200).send(user);


    } catch (e) {
        res.status(400).send({ error: e.message });
    }


}

const GetRegUser = async (req, res) => {

    const {email}=req.body;
    console.log('req headers ',req.headers);
    
    console.log("f1");
    try {
        console.log("Register req ", req.user);

        const user=await UserReg.find({email});
        if(user.length==0)
        {   
            console.log('not found user',user);
            res.status(400).send({message:"user not found"});
            return;
        }
        console.log('found user',user);
        res.status(200).send(user[0]);


    } catch (e) {
        res.status(400).send({ error: e.message });
    }


}


const DeleteRegUser = async (req, res) => {

    const {email}=req.body;
    console.log("f1");
    try {
        console.log("del Register req ", req.body);

        const user=await UserReg.deleteOne({email});
        if(!user)
        {   
            res.status(200).send({message:"not found"});
            return;
        }
        //console.log(user);
        res.status(200).send(user);


    } catch (e) {
        res.status(400).send({ error: e.message });
    }


}


const getApp=async (req,res)=>{

    console.log("i am here");

    try {
        const {Drcode } = req.body;
        const today = new Date();
        today.setDate(today.getDate() -1);
        await AppModel.deleteMany({ date: { $lt: today },Drcode:Drcode});

        const data = await AppModel.find({Drcode:Drcode});
        console.log(data.length);
        if (data.length == 3) return res.status(200).json(data);

        if (data.length == 2) {
            try {
                const dayAfterTomorrow = new Date();
                dayAfterTomorrow.setDate(today.getDate() + 2);
                const str=dateobjtostr(dayAfterTomorrow);
                await AppModel.create({ date: dayAfterTomorrow,str:str,slot: [1, 1, 1, 1, 1, 1, 1],Drcode:Drcode });
                const data = await AppModel.find({Drcode:Drcode});
                return res.status(200).json(data);

            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        }
        else if (data.length == 1) {
            try {
                const Tomorrow = new Date();
                Tomorrow.setDate(today.getDate() + 1);
                const str=dateobjtostr(Tomorrow);
                await AppModel.create({ date: Tomorrow,str:str, slot: [1, 1, 1, 1, 1, 1, 1],Drcode:Drcode });
                const dayAfterTomorrow = new Date();
                const str1=dateobjtostr(dayAfterTomorrow);
                dayAfterTomorrow.setDate(today.getDate() + 2);
                await AppModel.create({ date: dayAfterTomorrow,str:str1, slot: [1, 1, 1, 1, 1, 1, 1],Drcode:Drcode });
                const data = await AppModel.find({Drcode:Drcode});
                return res.status(200).json(data);



            } catch (err) {
                res.status(400).json({ error: err.message });
            }

        }
        else {
            console.log("here");
            try {
                const today = new Date();
                const str=dateobjtostr(today);
                await AppModel.create({ date: today,str:str, slot: [1, 1, 1, 1, 1, 1, 1],Drcode:Drcode });
                const Tomorrow = new Date();
                Tomorrow.setDate(today.getDate() + 1);
                const str1=dateobjtostr(Tomorrow);
                await AppModel.create({ date: Tomorrow, str:str1,slot: [1, 1, 1, 1, 1, 1, 1],Drcode:Drcode });
                const dayAfterTomorrow = new Date();
                dayAfterTomorrow.setDate(today.getDate() + 2);
                const str2=dateobjtostr(dayAfterTomorrow);
                await AppModel.create({ date: dayAfterTomorrow, str:str2,slot: [1, 1, 1, 1, 1, 1, 1],Drcode:Drcode });
                const data = await AppModel.find({Drcode:Drcode});
                return res.status(200).json(data);



            } catch (err) {
                res.status(400).json({ error: err.message });
            }


        }




    } catch (err) {
        console.log("something wrong");
        res.status(400).json({ error: err.message });
    }




}


const bookApp=async (req,res)=>{

    try {
        console.log(req.body);
        const { day, reqslot,Drcode } = req.body;
        const fd=helper(day);
        
        const data=await AppModel.findOne({str:fd,Drcode:Drcode});
        console.log(data);
        data.slot[reqslot]=0;
        const newobj={date:data.date,str:data.str,slot:data.slot,Drcode:Drcode};
        await AppModel.findOneAndReplace({str:fd,Drcode:Drcode},newobj);

        res.status(200).json({message:"successfull"});
        //res.redirect('/api/app');

        //res.status(200).json(payload);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}




module.exports = { RegUser,GetRegUser ,DeleteRegUser,getApp,bookApp};
