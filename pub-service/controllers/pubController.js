const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Publication = require("../models/pubModel");

dotenv.config();

// nouvelle publication
const newPub = async (req, res) => {
  try {
    // définir le nom de l'owner avec son token
    const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token du header
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifier et décoder le token
    req.body.author = decoded.id; // Ajouter l'id de l'auteur au body
    const pub = new Publication(req.body);
    await pub.save();
    res.status(201).send(pub);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Voir toutes les publications
const getAllPub = async (req, res) => {
  try {
    const pubs = await Publication.find();
    res.status(200).send(pubs);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Voir une publication par son id
const getPubById = async (req, res) => {
  try {
    const pub = await Publication.findById(req.params.id);
    res.status(200).send(pub);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Modifier une publication en étant connecté en tant qu'auteur
const updatePub = async (req, res) => {
  try {
    // Récupérer le token et vérifier l'utilisateur
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Décoder le token
    const userId = decoded.id; // Récupérer l'ID de l'utilisateur connecté

    // Trouver la publication
    const pub = await Publication.findById(req.params.id);
    if (!pub) {
      return res.status(404).send({ error: "Publication not found" });
    }

    // Vérifier que l'utilisateur est bien l'auteur de la publication
    if (pub.author.toString() !== userId) {
      return res.status(403).send({ error: "Forbidden: You are not the author of this publication" });
    }

    // Mettre à jour la publication
    const updatedPub = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).send(updatedPub);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Supprimer une publication en étant connecté en tant qu'auteur
const deletePub = async (req, res) => {
  try {
    // Récupérer le token et vérifier l'utilisateur
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Décoder le token
    const userId = decoded.id; // Récupérer l'ID de l'utilisateur connecté

    // Trouver la publication
    const pub = await Publication.findByIdAndDelete(req.params.id);
    if (!pub) {
      return res.status(400).send({ error: "Publication not found" });
    }

    // Vérifier que l'utilisateur est bien l'auteur de la publication
    if (pub.author.toString() !== userId) {
      return res.status(403).send({ error: "Forbidden: You are not the author of this publication" });
    }
    res.status(200).send("Publication supprimé");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { newPub, getAllPub, getPubById, updatePub, deletePub };