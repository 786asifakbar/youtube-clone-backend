import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req , res)=>{

//get user detail from frontend
const { fullname , username , email, password } = req.body

//validate - not empty
if(
    [fullname , username , email , password].some((field) =>
        field?.trim() === "")
    ){
        throw new ApiError(400 , "All field are required")
    }

  //check user already exits: username , email
  const exitedUser = User.findOne({
     $or : [{ username } , { email }]

  })  
  if(exitedUser){
    throw new ApiError(409 , "User with email and username is already exited ")
  }
    

//check for images , check for avatar 
const avatarlocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if( !avatarlocalPath ){
    throw new ApiError( 400 , " Avatar file is required ")
}


//upload them on cloundinary
const avatar = await uploadOnCloudinary(avatarlocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
    throw new ApiError( 400 , " Avatar file is required ")
}

//create user object  - create user in db
User.create({
    fullname ,
    avatar : avatar.url,
    coverImage : coverImage?.url || "",
    email ,
    password ,
    username:username.toLowerCase()
})

//remove password and refreshtoken field from response 
const createdUser = await User.findById(User._id).select(
    "_password _refreshToken "
)

//check for user createion
if(!createdUser){
throw new ApiError( 500 , "something went tp wrong while user registering ")
}

// return response to frontend 
return res.status(201).json(
    new ApiResponse(200 , createdUser , "User registered successfully ")
)

})

export {
     registerUser,
    
    
    }