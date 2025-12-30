import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {

        videoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, { timestamps: true })

likeSchema.index(
    {
        videoId: 1,
        userId: 1
    },
    { unique: true }
);

export const Like = mongoose.model("Like", likeSchema)