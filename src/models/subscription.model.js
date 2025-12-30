import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
          subscriber:{
            type : mongoose.Schema.Types.ObjectId,// one who subscribering 
            ref: "User"
          },
         channal:{
            type : mongoose.Schema.Types.ObjectId,// one to whom subscriber to subscribing 
            ref : "User"
         },

   },
{ timestamps: true })

const Subscription = mongoose.model("Subscription" , subscriptionSchema);