const express = require('express');
const mongoose = require('mongoose');
const UserRoutes=require('./Routes/UserRoutes');
const SecureRoutes=require('./Routes/SecureRoutes');
//import date from 'date-and-time';
const app = express();

app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/mern1')
    .then(() => {
        app.listen(4000, () => {
            console.log("listening on port 4000");
        });
    }
    )
    .catch(err => {
        console.log("here we are");
        console.log(err);
    });






app.use('/api/user',UserRoutes);
app.use('/api/secure',SecureRoutes);



app.get('*', (req, res) => {
    res.status(404).json({ error: "Page Not Found!!" });
});



