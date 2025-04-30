const express = require('express');
const checkTokenRouter = express.Router();
const authguard = require('../services/authguard');

checkTokenRouter.get('/checkToken', authguard, (req, res) => {
    console.log('--- /checkToken ---');
    console.log('Utilisateur dans req.user :', req.user); 
    res.status(200).json({ valid: true, user: req.user });
});

module.exports = checkTokenRouter;
