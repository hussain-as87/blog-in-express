import express from "express";
import { check, validationResult } from "express-validator";
import {notes} from "./main.mjs";
const app = express();

export const NoteRoute = express.Router();
NoteRoute.get("/", (req, res) => {
  res.render("notes", { notes });
});
NoteRoute.get("/create", (req, res) => {
  res.render("note_create");
});
NoteRoute.post(
  "/create/note",
  [check("text").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400);
      res.render("note_create", errors);
      return;
    }
    const new_note = await new Note({ text: req.body.text });
    res.redirect("/notes");
  }
);
NoteRoute.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id == id) {
      notes.splice(i, 1);
      res.status(200).redirect("/notes");
      return;
    }
  }
  res.redirect("/notes");
});
