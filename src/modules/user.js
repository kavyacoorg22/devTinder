const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=new mongoose.Schema({
    firstName:{
      type:String,
      minlength:4,
      required:true,
    },
    lastName:{
      type:String
    },
    emailId:{
      type:String,
      unique:true,
      required:true,
      lowercase:true,
      trim:true,
      validate(value){
        if(!validator.isEmail(value))
          throw new Error('invalid email address'+value);
      }
    },
    password:{
      type:String,
      required:true
    },
    age:{
      type:Number,
      min:18
    },
    gender:
    {
      type:String,
      validate(value)

      {
        if(!["male","female","other"].includes(value))
        {
          throw new Error("Gender is not valid")
        }
      }
    },
    about:{
      type:String,
      default:"This is the default value to the about"
    },
    skill:{
      type:[String]
    },
    photourl:{
      type:String,
      default:"https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg",
      validate(value){
        if(!validator.isURL(value))
          throw new Error('invalid photo URL');
      }
    }

  },{timestamps:true}
)


module.exports=mongoose.model("User",userSchema);