const Note = require("../models/note.model");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.note.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addNote = async (req, res) => {
  const { title, description } = req.body;
  const { userId, userName } = req.note;

  try {
    const note = await Note.create({ title, description, userId, userName });
    res.status(201).json({ message: "Note added", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const userId = req.note.userId;

  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.userId !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    const updated = await Note.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json({ message: "Note updated", note: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.note.userId;

  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.userId !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
