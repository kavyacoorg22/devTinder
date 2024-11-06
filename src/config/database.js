const mongoose=require('mongoose');

const connectDB= async () =>{
await mongoose.connect("mongodb+srv://kavyacoorg:kavya123@firsttry.okcyf.mongodb.net/devTinder")
}

module.exports=connectDB;
