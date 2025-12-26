import { Router } from "express";
import { registerUser, loginUser, logOutUser, refreshAccessToken } from "../controllers/user.controller.js";
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

router.route("refresh_token").post(refreshAccessToken)

export default router;