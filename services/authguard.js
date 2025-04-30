const jwt = require('jsonwebtoken');
require('dotenv').config();  

const authguard = (req, res, next) => {
    const token = req.cookies.refreshToken;
    console.log("Cookies reçus dans authguard :", req.cookies);
    
    if (!token) {
        return res.status(401).json({ error: "Accès refusé, token manquant" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        console.log("auth 15 Token décodé avec succès :", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        
            if (error.name === 'TokenExpiredError') {
                console.log('auth 21 Token expiré');
                return res.status(403).json({ error: "Le token a expiré" });
            }
        
            console.log('Erreur de vérification du token :', error);
            return res.status(403).json({ error: "Token invalide" });
        }
    
}

module.exports = authguard;
