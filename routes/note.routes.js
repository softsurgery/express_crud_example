module.exports = (app) => {
  const Note = require("../controllers/note.controller.js");
  app.post("/notes", Note.createNote);
  app.get("/notes", Note.getUserNotes);
  app.patch("/notes/:id", Note.updateNote);
  app.delete("/notes/:id", Note.deleteNote);
};
