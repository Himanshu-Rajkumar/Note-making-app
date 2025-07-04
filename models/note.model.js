const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String },
  userName: { type: String },
  date: { type: Date, default: Date.now },
}, {
  versionKey: false,
});

module.exports = mongoose.model("Note", noteSchema);
