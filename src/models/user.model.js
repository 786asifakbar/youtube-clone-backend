import mongoose from "mongoose";
import  JsonWebToken  from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username:{
       type: String,
       required : true,
       lowercase : true,
       unique: true,
       trim : true,
       index : true,       
    },
       email:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
       },
       fullname:{
        type : String,
        required : true,
        unique : true,
        index : true
       },

       email:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
       },
       avatar:{
        type : String,
        required : true,
       },
       coverImage:{
        type : String,
        required : true,
       },
       watchHistory:[
         {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Video",
         }
       ],
       password:{
         type : String ,
         required :[true , "Password is required"]
       },
       refreshToken:{
         type : String, 
       },
       
},{timestamps : true});



userSchema.pre("save", async function (next){
if(!this.isModified("password")) return(next);
   this.password = await bcrypt.hash(this.password, 10)
next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.campare(password, this.password)
}



userSchema.method.genrateAccessToken = function(){
   return jwt.sign({          
         _id: this.id,
         username: this.username,
         email: this.email,
         fullname : this.fullname,
   },

   process.env.ACCESS_TOKEN_SECRATE,
   {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY
   }
)
};

userSchema.method.genrateRefreshToken = function(){
   return jwt.sign(
      {
       _id: this.id,
      },
   process.env.REFRESH_TOKEN_SECRATE,
   {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY
   }
)
};

export const User = mongoose.model("User" , userSchema);