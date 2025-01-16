const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

// Redirection vers le User Service pour l'inscription
app.use('/user/register', createProxyMiddleware({
  target: 'http://localhost:3003/user/register', // Service des produits
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Requête proxy : ${req.method} ${req.url}`);
  },

}));

// Redirection vers le User Service pour la connexion
app.use('/user/login', createProxyMiddleware({
  target: 'http://localhost:3003/user/login', // Service des produits
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Requête proxy : ${req.method} ${req.url}`);
  },
}));

// Redirection vers le Publications Service pour récupérer toutes les publications
app.use('/pub', createProxyMiddleware({
  target: 'http://localhost:3002/pub', // Service des publications
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Requête proxy : ${req.method} ${req.url}`);
  },
}));

// Redirection vers le Publications Service pour récupérer une publication par son id
app.use('/pub/:id', createProxyMiddleware({
  target: 'http://localhost:3002/pub/:id', // Service des publications
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Requête proxy : ${req.method} ${req.url}`);
  },
}));

// Redirection vers le Publications Service pour créer une publication
app.use('/pub/create', createProxyMiddleware({
  target: 'http://localhost:3002/pub/create', // Service des publications
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Requête proxy : ${req.method} ${req.url}`);
  },
}));

// Redirection vers le Publications Service pour mettre à jour une publication
app.use('/pub/:id', createProxyMiddleware({
  target: 'http://localhost:3002/pub/:id', // Service des publications
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Requête proxy : ${req.method} ${req.url}`);
  },
}));

// Redirection vers le Publications Service pour supprimer une publication
app.use('/pub/:id', createProxyMiddleware({
  target: 'http://localhost:3002/pub/:id', // Service des publications
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Requête proxy : ${req.method} ${req.url}`);
  },
}));

const PORT = process.env.GATEWAY_PORT || 4000;

app.listen(PORT, () => {
  console.log(`API Gateway démarrée sur le port ${PORT}`);
});
