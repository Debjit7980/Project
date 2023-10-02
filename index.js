const express=require('express');
const mongoose=require('mongoose');
const Collections=require('./Model');
const empDetails=require('./db');
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000;
mongoose.connect('mongodb://127.0.0.1:27017/db', {
useNewUrlParser: true,
useUnifiedTopology: true
  });

Collections.createIndexes();
/*app.get("/",(req,res)=>{
  res.send("App is Working, Hello ");
}); */
app.delete('/deleteEmp/:id',(req,res)=>{
  const id=req.params.id
  empDetails.findByIdAndDelete({_id:id})
  .then(emp=>res.json(emp))
  .catch(err=>res.json(err))
})
app.put('/updateEmp/:id',(req,res)=>{
  const id=req.params.id
  console.log(req.body.name)
  empDetails.findByIdAndUpdate({_id:id},{name:req.body.name,email:req.body.email,dept:req.body.dept,salary:req.body.salary})
  .then(emp=>{
    res.json(emp)
    })
  .catch(e=>res.json(e))
})

app.get('/getEmp/:id',(req,res)=>{
  const id=req.params.id
  empDetails.findById({_id:id})
  .then(emp=>res.json(emp))
  .catch(e=>res.json(e))
})
app.get('/',(req,res)=>{
  try
  {
    empDetails.find({})
    .then(emp=>res.json(emp))
    .catch(err=>res.json(err))
  }
  catch(e)
  {
    console.error(e);
  }
})

app.post('/addUser',async(req,res)=>{
  try{
    const[name,email,dept,salary]=req.body

    empDate={name,email,dept,salary}
    const emp=new empDetails(empDate);
    let result=await emp.save();
    res.send({message:"Employee Added Successfully",emp:emp})
    result=result.toObject()
    console.log(result);
  }
  catch(e){
    console.log(e);
    res.send({message:"Employee not added"});
  }
})





app.post('/signin',async(req,res)=>{
  try{
    const [email,password]=req.body

    //const formData={email,password}
    const user=await Collections.findOne({email:email})
    if(user)
    {
      if(password===user.password)
      {
        res.send({message:"Successfully Logged In",user:user});
      }
      else
      {
        res.send({message:"Password Invalid"});
      }
    }
    else
    {
      res.send({message:"Not Registered"});
    }
  }
  catch(e){
    console.error(e);
  }
})

app.post('/signup',async(req,res)=>{
  try{
    const name = req.body.name
    const email = req.body.email
    const contact=req.body.cont
    const address=req.body.add
    const password=req.body.pass

    const formData ={
      name,email,contact,address,password
    }
    const user=await Collections.findOne({email:email});
    if(user)
    {
      res.send({message:"User is already registered"});
      console.log("User is already registered ");
    }
    else
    {
      res.send({message:"Registered Successfully now Sign In"});
      const user=new Collections(formData);   //Passed the form data to the collection module to store in the database.
      let result=await user.save();           //saving the data to the database.
      //alert("Data is stored Successfully");
      result=result.toObject();
      
      console.log(result);
    }
    
   
  }
 
  catch(error){
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(port,()=>{
    console.log("Connected");
    console.log(`Server is running on port: ${port}`);
});

