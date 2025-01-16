- github : https://github.com/Anas7823/instarchi

- Les endpoints disponibles :

| Endpoint | Description | Type
| --- | --- |
| http://localhost:4000/pub/create | Crée une nouvelle publication | POST |
| http://localhost:4000/pub/ | Permet de récupérer toutes les publications sans| GET |
| http://localhost:4000/pub/:id | Retourne une publication par son id | GET |
| http://localhost:4000/pub/:id | Met à jour une publication | PUT |
| http://localhost:4000/pub/:id | Supprime une publication | DELETE |
| http://localhost:4000/user/login | connexion | POST |
| http://localhost:4000/user/register | inscription | POST |

- Comment lancer les services:

Il faut démarrer se déplacer dans chacun des dossiers, installer les dépendances si nécéssaire avec `npm i` et lancer le serveur avec la commande `npm start`.

- Redis.
Pas mis en place pour le moment.
