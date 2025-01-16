import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Register() {
    const [fields, setfields] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setfields({
            ...fields,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:4000/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setMessage('Inscription réussie !');
            localStorage.setItem('token', data.token); // Stocke le token JWT
            setfields({ name: '', email: '', password: '' }); // Réinitialise le formulaire
            navigate('/home'); // Redirige vers la liste des utilisateurs ou une autre page
          } else {
            setMessage(data.error || 'Erreur d\'inscription.');
          }
        } catch (error) {
          console.error('Erreur :', error);
          setMessage('Impossible de contacter le serveur.');
        }
    };   
    
    const handleLoginRedirect = () => {
        navigate('/'); // Redirige vers la page de connexion
    };

    return (
        <div className='Register'>
            <h2>Inscription</h2>
            {message && <p >{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" >Nom :</label>
                    <input type="text" id="name" name="name" value={fields.name} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="email" >Email :</label>
                    <input type="email" id="email" name="email" value={fields.email} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" value={fields.password} onChange={handleChange} required/>
                </div>
                <button type="submit" >S'inscrire</button>
            </form>
            <button onClick={handleLoginRedirect}>Je suis déjà inscrit, me connecter</button>
        </div>
    )
}

export default Register
