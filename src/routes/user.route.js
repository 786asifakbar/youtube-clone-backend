import { Router } from "express";
import {registerUser,loginUser,logOutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,updateAccountDetail,updateUserAvatar,updateUserCoverImage ,getUserChannalProfile,getWatchHistory
        } from "../controllers/user.controller.js";
import { upload }  from "../middleweares/multer.middlewere.js";
import { verifyJWT } from "../middleweares/auth.middleware.js";

const router = Router();

router.route("/register").post(
upload.fields([ 
{
    name: "avatar",
    maxCount : 1,
},
{
    name : "coverImage",
    maxCount : 1 ,
}    
]),
    registerUser
);
 
router.route("/login").post(loginUser)
//secure route
router.route("/logout").post(verifyJWT , logOutUser)
router.route("/refresh_token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT , changeCurrentPassword)
router.route("/current-user").get(verifyJWT , getCurrentUser)
router.route("/update-account").patch(verifyJWT ,updateAccountDetail)
router.route("/avatar").patch(verifyJWT ,upload.single("avatar"), updateUserAvatar)
router.route("/coverImage").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage )
router.route("/c/:username").get(verifyJWT , getUserChannalProfile)
router.route("/history").post(verifyJWT,getWatchHistory)

export default router;