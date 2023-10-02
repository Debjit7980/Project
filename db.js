const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/db', {
useNewUrlParser: true,
useUnifiedTopology: true
  });

const empSchema=new mongoose.Schema({
    name:String,
    email:String,
    dept:String,
    salary:String
  })
  
  const empDetails=mongoose.model('empDetails',empSchema)
  module.exports=empDetails