const express = require("express");
const { getNotes, addNote, updateNote, deleteNote } = require("../controllers/note.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/myNotes", authMiddleware, getNotes);
router.post("/addNote", authMiddleware, addNote);
router.put("/updateNote/:id", authMiddleware, updateNote);
router.delete("/deleteNote/:id", authMiddleware, deleteNote);

module.exports = router;
