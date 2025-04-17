const express = require('express');
const checkTokenRouter = express.Router();
const authguard = require('../services/authguard');

checkTokenRouter.get('/checkToken', authguard, (req, res) => {
    res.status(200).json({ valid: true, user: req.user });
});

module.exports = checkTokenRouter;
