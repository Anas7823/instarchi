import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PublicationDetails() {
    const { id } = useParams();
    const [pub, setPub] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:4000/pub/${id}`)
            .then((res) => setPub(res.data))
            .catch((err) => console.error("Erreur :", err));
    }, [id]);

    if (!pub) return <p>Chargement...</p>;

    return (
        <div className="PublicationDetails">
            <h1>{pub.title}</h1>
            <p>{pub.description}</p>
            <p>
                <strong>Type :</strong> {pub.type}
            </p>
            <p>
                <strong>Créée le :</strong>{" "}
                {new Date(pub.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
}

export default PublicationDetails;
