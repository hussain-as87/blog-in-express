import mongoose from "mongoose";
const schema = mongoose.Schema({
    text : String ,
});

export const Note = mongoose.model("Note",schema,'notes');
