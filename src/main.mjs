import express from "express";
import session from "cookie-session";
import { check, validationResult } from "express-validator";
import hbs from "hbs";
import path from "path";
import { _app } from "../config.mjs";
import mongoose from "mongoose";
import { User } from "./models/User.mjs";
import { AuthRoute, userVerify } from "./auth.mjs";
import { NoteRoute } from "./notes.mjs";
import { Note } from "./models/Notes.mjs";
import { DbConnect } from "./connection.mjs";

const app = express();
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: _app.secret_key,
  })
);
/* app.locals.auth_name = req.session.user;
 */
app.set("views", path.resolve("src/views"));
hbs.registerPartials(path.resolve("src/views/layouts"));
DbConnect();
export const users = await User.find();
export const notes = await Note.find();

app.use("/notes",[userVerify,NoteRoute]);
app.use("/", AuthRoute)

app.get("/", userVerify, async (req, res) => {
  res.render("index");
});
app.get("/users", userVerify, async (req, res) => {
  res.render("users", { users });
});
app.listen(_app.port, () => {
  console.clear();
  console.log(`strat at http://localhost:${_app.port}`);
});
