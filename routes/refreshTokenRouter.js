const express = require('express');
const jwt = require('jsonwebtoken');
const refreshTokenRouter = express.Router();

refreshTokenRouter.get('/refreshToken', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Token de rafraîchissement manquant" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );

    res.status(200).json({ message: "Access token renouvelé avec succès", newAccessToken });
  } catch (error) {
    console.error("Erreur de refreshToken :", error);
    return res.status(403).json({ error: "Refresh token invalide ou expiré" });
  }
});

module.exports = refreshTokenRouter;
