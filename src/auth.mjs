import express from "express";
import { check, validationResult } from "express-validator";
import { users } from "./main.mjs";
const app = express();

export const AuthRoute= express.Router();

AuthRoute.get("/login", (req, res) => {
    if (req.session.user) {
      res.redirect("/");
      return;
    }
    res.render("login");
  });
AuthRoute.post(
    "/login",
    [check("username").notEmpty(), check("password").notEmpty()],
    (req, res) => {
      const { username, password } = req.body;
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        res.status(400);
        res.render("login", errors);
        return;
      }
  
      const user = users.find(
        (u) => u.username == username && u.password == password
      );
      if (!user) {
        res.status(400).render("/login");
        return;
      }
      req.session.user = username;
      res.redirect("/");
    }
  );
  AuthRoute.get("/logout",userVerify, (req, res) => {
    req.session = null;
    res.redirect("/login");
  });
  export function userVerify(req, res, next) {
    if (req.session.user) {
      next();
      return;
    }
    res.redirect("/login");
  }