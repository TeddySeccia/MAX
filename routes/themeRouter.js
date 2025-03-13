const { PrismaClient } = require('@prisma/client');
const hashPassword = require('../services/extensions/hashPasswordExtension');
const bcrypt = require('bcrypt');
const upload = require('../core/multer')
const authguard = require('../services/authguard');
const themeRouter = require('express').Router();
const prisma = new PrismaClient({ log: ['error'] })



themeRouter.post('/addTheme',upload.single('icones'), async (req, res) => { //Route fonctionnelle
    /*.setItem('firstName', req.body.firstName); si on veut stocker des données dans le localStorage
    localStorage.getItem('firstName');
    localStorage.clear();
    sessionStorage.setItem('firstName', req.body.firstName); si on veut stocker des données dans le sessionStorage*/
    try {
        console.log("rentre sur la route /addTheme - uR17");
        console.log("FICHIER UPLOADE :", req.file);



        
        //data : {fields de droite "req.body.firstName" sont les memes que les "name" dans le formulaire il faut qu'ils s'appellent pareil} gauche db droite formulaire
        const themes = await prisma.theme.create({
            data: {
                themeName: req.body.themeName, 
               
            }
        })
        res.json('Theme ajouté avec succès');


    } catch (error) {
        console.log(error);
        res.json({ error });
    }

});

module.exports = themeRouter;