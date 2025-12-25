import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


// 5 access and refresh tokens
const genrateAccessAndRefreshTokens = async (userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.genrateAccessToken();
        const refreshToken = user.genrateRefreshToken();
       
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave : false })

    } catch (error) {
        throw new ApiError(500, "somethinf went to wrong while genrating access and refresh tokens")
    }
} 


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
//const coverImageLocalPath = req.files?.coverImage[0]?.path;

if( !avatarlocalPath ){
    throw new ApiError( 400 , " Avatar file is required ")
}


//upload them on cloundinary
const avatar = await uploadOnCloudinary(avatarlocalPath)
//const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
    throw new ApiError( 400 , " Avatar file is required ")
}

//create user object  - create user in db
User.create({
    fullname ,
    avatar : avatar.url,
    //coverImage : coverImage?.url || "",
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

});

const loginUser = asyncHandler(async(req , res) => {

    //1 get data req.body 
   const {username , email , password } = req.body;
   
   if(!username || !email){
    throw new ApiError(400 , " user and password are required ")
   };

// 2 check email and username 
const user = await User.findOne({
    $or :[{username},{email}]
});

// 3 find user
if(!user){
    throw new ApiError(404 , " user does not exits ")
}
 
// 4 check password
const passwordValidate =  await user.isPasswordCorrect(password)
if(!passwordValidate){
    throw new ApiError(401 , " Invalid user creditionals ")
}

// 5 used access and refresh token 
const { accessToken , refreshToken } = await genrateAccessAndRefreshTokens(user._id)
const loggedinUser = await User.findById(user._id)
.select("_password -refreshtoken ")

const options = { 
    httpOnly : true ,
    secure : true 
 }

// 6 send cookies

return res
.status(200)
.cookie("accessToken" , accessToken , options)
.cookie("refreshTpken" , refreshToken , options)
.json(
new ApiResponse(200 , {
    user: loggedinUser , accessToken , refreshToken
},
" user LoggedIn Successfully "
 )
)

})



const logOutUser = asyncHandler(async (req , res)=>{
User.findByIdAndUpdate(
    req.user._id,
    {
        $set:{
            refreshToken: undefined 
        }
    },
{
    new : true
}

)

const options = {
httpOnly: true,
secure : true,

}

return res
.status(200)
.ClearCookie("accessToken", options)
.ClearCookie("refreshToken" , options)
.json(
    new ApiResponse(200, {}, "User logout Successfully")
)
})



export {
     registerUser,
     loginUser,
     logOutUser,
    
    
    }