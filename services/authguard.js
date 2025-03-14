const jwt = require('jsonwebtoken');
require('dotenv').config();



const authguard = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({ error: "Accès refusé, token manquant" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie le token
        req.user = decoded; // Ajoute l'utilisateur au `req`
        next(); // Passe à la suite
    } catch (error) {
        return res.status(403).json({ error: "Token invalide" });
    }


}

module.exports = authguard
