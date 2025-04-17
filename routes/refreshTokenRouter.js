// refreshTokenRouter.js
const express = require('express');
const jwt = require('jsonwebtoken');
const refreshTokenRouter = express.Router();
const authguard = require('../services/authguard');

// Middleware pour vérifier le refresh token (logique similaire à authguard)
refreshTokenRouter.get('/refreshToken', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Token de rafraîchissement manquant" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newToken = jwt.sign({ idUser: decoded.idUser }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', newToken, { httpOnly: true });
    res.status(200).json({ token: newToken });
  } catch (error) {
    return res.status(403).json({ error: "Erreur de vérification du refresh token" });
  }
});

module.exports = refreshTokenRouter;
