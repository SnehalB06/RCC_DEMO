const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const employeeRoutes = require('./routes/adminEmployee')


const app = express();

app.use(express.json());
app.use('/api/admin',employeeRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
//listening
app.listen(process.env.PORT,()=>{
  console.log(`Listening  on Port ${process.env.PORT}`);
});


})
.catch((err)=>{
  console.log(err);
})


