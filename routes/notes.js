var express = require('express');
var router = express.Router();
const verifyToken = require("../middleware/authentication");

let notesController = require("../controllers/notes");

router.post("/createnote",verifyToken,notesController.createNote);
router.post("/noteId/:noteId/updateNote",verifyToken,notesController.updateNote);
router.post("/noteId/:noteId/deleteNote",verifyToken,notesController.deleteNote);
router.get("/getAllNotes",verifyToken,notesController.getAllNotes);
router.post("/noteId/:noteId/updateNoteStatus",verifyToken,notesController.updateNoteStatus);

module.exports = router;