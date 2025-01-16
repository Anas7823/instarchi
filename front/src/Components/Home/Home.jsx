import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const [pubs, setPubs] = useState([]); // Stocke les publications
    const [title, setTitle] = useState(""); // Titre de la publication
    const [description, setDescription] = useState(""); // Description de la publication
    const [type, setType] = useState("#humour"); // Type de la publication
    const [editingPub, setEditingPub] = useState(null); // Publication en cours de modification
    const [userId, setUserId] = useState(""); // ID de l'utilisateur connecté
    const [isAuthenticated, setIsAuthenticated] = useState(false); // État de connexion
    const navigate = useNavigate();

    const token = localStorage.getItem("token"); // Récupérer le token stocké

    useEffect(() => {
        fetchPubs();
        decodeUserIdFromToken(); // Décoder l'ID utilisateur depuis le token
    }, []);

    // Décoder l'ID utilisateur depuis le token JWT
    const decodeUserIdFromToken = () => {
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            setUserId(decodedToken.id); // Récupère l'ID de l'utilisateur connecté
            setIsAuthenticated(true); // L'utilisateur est connecté
        }
    };

    // Fonction pour récupérer toutes les publications
    const fetchPubs = async () => {
        try {
            const res = await axios.get("http://localhost:4000/pub");
            setPubs(res.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des publications :", err);
        }
    };

    // Fonction pour ajouter une nouvelle publication
    const handleAddPub = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:4000/pub/create",
                { title, description, type },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPubs([...pubs, res.data]);
            setTitle("");
            setDescription("");
            setType("#humour");
        } catch (err) {
            console.error("Erreur lors de l'ajout de la publication :", err);
        }
    };

    // Fonction pour modifier une publication
    const handleEditPub = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `http://localhost:4000/pub/${editingPub._id}`,
                { title, description, type },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPubs(pubs.map((pub) => (pub._id === editingPub._id ? res.data : pub)));
            setEditingPub(null);
            setTitle("");
            setDescription("");
            setType("#humour");
        } catch (err) {
            console.error("Erreur lors de la modification de la publication :", err);
        }
    };

    // Fonction pour supprimer une publication
    const handleDeletePub = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/pub/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPubs(pubs.filter((pub) => pub._id !== id));
        } catch (err) {
            console.error("Erreur lors de la suppression de la publication :", err);
        }
    };

    // Préparer une publication pour modification
    const startEditing = (pub) => {
        setEditingPub(pub);
        setTitle(pub.title);
        setDescription(pub.description);
        setType(pub.type);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false); // Mettre à jour l'état de connexion
        navigate("/"); // Redirige l'utilisateur vers la page d'accueil
    };

    const handleLogin = () => {
        navigate("/"); // Redirige vers la page de connexion
    };

    return (
        <div className="Home">
            {/* Bouton de déconnexion ou de connexion */}
            <button onClick={isAuthenticated ? handleLogout : handleLogin}>
                {isAuthenticated ? "Déconnexion" : "Connexion"}
            </button>

            <h1>Publications</h1>

            {/* Formulaire d'ajout ou de modification (uniquement si connecté) */}
            {isAuthenticated && (
                <form onSubmit={editingPub ? handleEditPub : handleAddPub}>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="#humour">#humour</option>
                        <option value="#actu">#actu</option>
                        <option value="#action">#action</option>
                        <option value="#fiction">#fiction</option>
                        <option value="#horreur">#horreur</option>
                    </select>
                    <button type="submit">{editingPub ? "Modifier" : "Ajouter"}</button>
                </form>
            )}

            {/* Message si l'utilisateur n'est pas connecté */}
            {!isAuthenticated && <p>Veuillez vous connecter pour ajouter une publication.</p>}

            {/* Liste des publications */}
            {pubs.map((pub) => (
                <div key={pub._id} className="pub-card">
                    <h2 onClick={() => navigate(`/publication/${pub._id}`)}>{pub.title}</h2>
                    <p>{pub.description}</p>
                    <p>
                        <strong>Type :</strong> {pub.type}
                    </p>
                    <p>
                        <strong>Créée le :</strong>{" "}
                        {new Date(pub.createdAt).toLocaleDateString()}
                    </p>

                    {/* Boutons affichés uniquement si l'utilisateur est l'auteur */}
                    {pub.author === userId && (
                        <>
                            <button onClick={() => startEditing(pub)}>Modifier</button>
                            <button onClick={() => handleDeletePub(pub._id)}>Supprimer</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Home;
