const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["#humour", "#actu", "#action", "#fiction", "#horreur"], 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporter le modèle
module.exports = mongoose.model("Publication", publicationSchema);