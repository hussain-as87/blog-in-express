import mongoose from "mongoose";


const schema = mongoose.Schema({
    username : String ,
    password : String
});

export const User = mongoose.model("User",schema,'users');