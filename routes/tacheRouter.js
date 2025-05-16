const { PrismaClient } = require('@prisma/client');
const hashPassword = require('../services/extensions/hashPasswordExtension');
const bcrypt = require('bcrypt');
const upload = require('../core/multer')
const authguard = require('../services/authguard');
const tacheRouter = require('express').Router();
const prisma = new PrismaClient({ log: ['error'] })




tacheRouter.post('/addTache', async (req, res) => { // Route fonctionnelle
    try {
        console.trace("rentre sur la route /addTache - uR11");
        const tache = await prisma.tache.create({
            data: {
                tacheName: req.body.tacheName,
                tacheDescription: req.body.tacheDescription,
                tacheStart: new Date(req.body.tacheStart),
                tacheEnd: new Date(req.body.tacheEnd),
                tacheStatus: req.body.tacheStatus,
                tachePriority: req.body.tachePriority,
                tacheAttribute: req.body.tacheAttribute || null,
                document: {
                    connect: [{ idDocument: parseInt(req.body.idDocument) }]
                },
                user: {
                    connect: { idUser: parseInt(req.body.idUser) }
                }

            }
        })
        return res.json({ message: 'tâche ajoutée avec succès', tache });

    } catch (error) {
        console.error('Erreur création tâche:', error);
        return res.status(500).json({ error: error.message });
    }
});

tacheRouter.get("/deleteTache/:id", async (req, res) => {
    try {
        console.log("rentre sur la route /deletetache/:idtache - uR 30");
        const deletetache = await prisma.tache.delete({
            where: {
                idtache: parseInt(req.params.id),
            }
        })
        res.json('tache supprimée avec succès');
    }
    catch (error) {
        res.json({ error });
    }
})

tacheRouter.get('/getTache/:id', async (req, res) => {

    try {
        console.log("rentre sur la route /getTache/:id - uR 45");
        const getTache = await prisma.tache.findFirst({
            where: {
                idTache: parseInt(req.params.id),

            },
            include: {
                icones: true, // Permet de récupérer les icones associées à la catégorie
            },
        })
        res.json({
            getTache,
        })
    } catch (error) {
        res.json({ error });
    }
})

tacheRouter.get('/getTaches/:userId', async (req, res) => {

    try {
        console.log("rentre sur la route /getTaches - cR65");
        const getTaches = await prisma.tache.findMany({
            where: {
                userId: parseInt(req.params.userId),

            },
           
        })
        res.json(
            getTaches
        )
    } catch (error) {
        res.json({ error });
    }

})


tacheRouter.put("/editPostTache/:id", async (req, res) => {
    try {
        console.log("rentre dans la route /editPostTache/:id - cR79");
        const existingTache = await prisma.tache.findUnique({ where: { idTache: parseInt(req.params.id) } });
        const parent = req.body.tacheParent ? req.body.tacheParent : null;

        if (!existingTache) {
            return res.status(404).json({ error: "tache non trouvé" });
        }

        const tache = await prisma.tache.update({
            where: {
                idtache: parseInt(req.params.id),
            },

            data: {
                tacheName: req.body.tacheName,
                tacheParent: parseInt(parent),
                icones: {
                    connect: { idIcone: parseInt(req.body.idIcone) }
                }

            }
        })

        res.json('tache modifiée avec succès');
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
})





module.exports = tacheRouter;

