import dotenv from "dotenv";
import connectDB from "./db/index.db.js";
import app from "./app.js"
dotenv.config({path : "./.env"});

connectDB();

app.get("/api/massage",(req , res)=>{
    res.send(massage)
});

app.listen(process.env.PORT , ()=>{
    console.log("frontend and backend connection successfully")
})
