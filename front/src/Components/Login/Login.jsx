import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Login() {

    const [fields, setfields] = useState({
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
          const response = await fetch('http://localhost:4000/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setMessage('Connexion réussie !');
            localStorage.setItem('token', data.token); // Stocke le token JWT
            setfields({ email: '', password: '' }); // Réinitialise le formulaire
            navigate('/home'); // Redirige vers la liste des utilisateurs ou une autre page
          } else {
            setMessage(data.error || 'Erreur de connexion.');
          }
        } catch (error) {
          console.error('Erreur :', error);
          setMessage('Impossible de contacter le serveur.');
        }
    };   
    
    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirige vers la page d'inscription
    };


    return (
        <div className="Login">
            <h2>Connexion</h2>
            {message && <p >{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" >Email :</label>
                    <input type="email" id="email" name="email" value={fields.email} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" value={fields.password} onChange={handleChange} required/>
                </div>
                <button type="submit" >Se connecter</button>
            </form>
            <button onClick={handleRegisterRedirect}>Je n'ai pas de compte, m'inscrire</button>
            <Link to="/home">Voir comme invité</Link>
        </div>
    )
}

export default Login
