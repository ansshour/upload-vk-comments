import mongoose from "mongoose";


const Comments = new mongoose.Schema({
    name: {type: String},
    id: {type: Number},
    photo: {type: String},
    text: {type: String},
})


export default mongoose.model("Comments", Comments)