const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/db', {
useNewUrlParser: true,
useUnifiedTopology: true
  });
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    contact:String,
    address:String,
    password:String
})

const Collections=mongoose.model("details",userSchema)
module.exports=Collections

