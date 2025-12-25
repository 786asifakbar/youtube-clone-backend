import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

 export const verifyJWT = asyncHandler( async( req, res, next ) => {
req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ","")
if(!token){
    throw new ApiError(401, "Unathorized request");
}

 })

