import mongoose from "mongoose";

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



export const User = mongoose.model("User" , userSchema);