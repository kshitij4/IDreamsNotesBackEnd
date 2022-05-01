var express = require('express');
var router = express.Router();
const verifyToken = require("../middleware/authentication");

let notesController = require("../controllers/notes");

router.post("/userId/:userId/createnote",verifyToken,notesController.createNote);
router.post("/userId/:userId/noteId/:noteId/updateNote",verifyToken,notesController.updateNote);
router.post("/noteId/:noteId/deleteNote",verifyToken,notesController.deleteNote);
router.get("/userId/:userId/getAllNotes",verifyToken,notesController.getAllNotes);
router.post("/userId/:userId/noteId/:noteId/updateNoteStatus",verifyToken,notesController.updateNoteStatus);

module.exports = router;