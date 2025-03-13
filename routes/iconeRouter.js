const { PrismaClient } = require('@prisma/client');
const upload = require('../core/multer')
const authguard = require('../services/authguard');
const iconeRouter = require('express').Router();
const prisma = new PrismaClient();
const path = require('path');
const deleteImage = require('../core/fs');



iconeRouter.post('/addIcone', upload.single('iconeAvatar'), async (req, res) => { //Route fonctionnelle
    /*.setItem('firstName', req.body.firstName); si on veut stocker des données dans le localStorage
    localStorage.getItem('firstName');
    localStorage.clear();
    sessionStorage.setItem('firstName', req.body.firstName); si on veut stocker des données dans le sessionStorage*/
    try {
        console.log("rentre sur la route /addIcone - uR17");
        console.log("FICHIER UPLOADE :", req.file);

        const image = req.file ? req.file.filename : "iconeAvatar-1741876409054-461400216.png";
        const imagePath = req.file ? req.file.path : path.join(__dirname, 'public', 'uploads', 'META_icones', 'iconeAvatar-1741876409054-461400216.png');
        //data : {fields de droite "req.body.firstName" sont les memes que les "name" dans le formulaire il faut qu'ils s'appellent pareil} gauche db droite formulaire
        const icones = await prisma.icone.create({
            data: {
                iconeName: req.body.iconeName,
                iconeColor: req.body.iconeColor,
                iconeType: req.body.iconeType,
                iconeAvatarPath: imagePath,
                themeIdKey: parseInt(req.body.themeIdKey),
                iconeAvatar: image,

            }
        })
        res.json('Icone ajoutée avec succès');


    } catch (error) {
        console.log(error);
        res.json({ error });
    }

});

iconeRouter.get("/deleteIcone/:id", async (req, res) => {// Route fonctionnelle  
    try {
        console.log("rentre sur la route /deleteIcone/:idIcone - uR 45");
        const icone = await prisma.icone.findUnique({
            where: {
                idIcone: parseInt(req.params.id)
            },
        });
        if (!icone) {
            return res.status(404).json({ error: "Icône non trouvée" });
        }
        const deleteIcone = await prisma.icone.delete({
            where: {
                idIcone: parseInt(req.params.id),
            }
        })
        deleteImage(icone.iconePath);
        res.json('Icône supprimée avec succès');
    }
    catch (error) {
        res.json({ error });
    }
})

iconeRouter.get('/getIcone/:id', async (req, res) => { //Route fonctionnelle
    console.log("rentre sur la route /getIcone/:id - uR 70");
    try {
        const icone = await prisma.icone.findFirst({
            where: {
                idIcone: parseInt(req.params.id),
            }
        })
        res.json({
            icone,
            title: "Accueil",
        })
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
});

iconeRouter.get('/getIcones', async (req, res) => { //Route fonctionnelle
    console.log("rentre sur la route /getIcone/:id - uR 89");
    try {
        const icones = await prisma.icone.findMany()
        res.json({
            icones,


        })
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
});

iconeRouter.put("/editPostIcone/:id", upload.single('iconeAvatar'), async (req, res) => {//Route fonctionnelle
    try {
        
        const existingIcone = await prisma.icone.findUnique({ where: { idIcone: parseInt(req.params.id) }});

        if (!existingIcone) {
            return res.status(404).json({ error: "Icone non trouvé" });
        }
        const image = req.file ? req.file.filename : "iconeAvatar-1741876409054-461400216.png";
        const imagePath = req.file ? req.file.path : path.join(__dirname, 'public', 'uploads', 'META_icones', 'iconeAvatar-1741876409054-461400216.png');

        const icone = await prisma.icone.update({
            where: {
                idIcone: parseInt(req.params.id),
            },

            data: {
                iconeName: req.body.iconeName,
                iconeColor: req.body.iconeColor,
                iconeType: req.body.iconeType,
                themeIdKey: parseInt(req.body.themeIdKey),
                iconeAvatar: image,
                iconeAvatarPath: imagePath,
            }
        }) 
        
        if (image !== existingIcone.iconeAvatar) {
            deleteImage(existingIcone.iconeAvatarPath);
        }
        res.json('Icone modifiée avec succès');
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
})
module.exports = iconeRouter;