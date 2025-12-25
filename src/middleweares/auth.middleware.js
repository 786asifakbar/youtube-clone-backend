import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler( async( req, res, next ) => {

try {
    const token = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ","")
    if(!token){
        throw new ApiError(401, "Unathorized request");
    }
    
    const decodedToken = jwt.verify(token.process.env.ACCESS_TOKEN_SECRATE)
    const user = await User.findById(decodedToken?._id).select("_password _refreshToken")
    
    
    if(!user){
        // descus in next video
        throw new ApiError(401 , " Invalid Access Token ")
    }
    
    req.user = user
    next()
    
} catch (error) {
    throw new ApiError(401 , error?.message || "invalid access token")
    
}
 

})

