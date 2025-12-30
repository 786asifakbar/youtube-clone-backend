import mongoose from "mongoose";
const playlistSchema = new mongoose.Schema(
    {

    },
    { timestamps: true })

export const PlayList = mongoose.model("PlayList", playlistSchema);