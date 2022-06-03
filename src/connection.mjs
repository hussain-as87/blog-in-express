import mongoose from "mongoose";
import { _app } from "../config.mjs";

export async function DbConnect(){
    return await mongoose.connect(`${_app.connection_url}/${_app.db_name}`);
}