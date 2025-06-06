const { PrismaClient } = require('@prisma/client');
const upload = require('../core/multer')
const authguard = require('../services/authguard');
const categoryRouter = require('express').Router();
const prisma = new PrismaClient({ log: ['error'] }) //si plusieurs extends, les concatener "new PrismaClient().$extends(ext1).$extends(ext2).$extends(ext3);"



categoryRouter.post('/addCategory', async (req, res) => { // Route fonctionnelle
    try {
        console.trace("rentre sur la route /addCategory - uR11");
        const categories = await prisma.category.create({
            data: {
                categoryName: req.body.categoryName,
                icones: {
                    connect: { idIcone: parseInt(req.body.idIcone) }
                },
                user: {
                    connect: { idUser: parseInt(req.body.idUser) }
                }

            }
        })
        res.json('category ajouté avec succès');

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
});

categoryRouter.get("/deleteCategory/:id", async (req, res) => {// Route fonctionnelle
    try {
        console.log("rentre sur la route /deleteCategory/:idCategory - uR 30");
        const deleteCategory = await prisma.category.delete({
            where: {
                idCategory: parseInt(req.params.id),
            }
        })
        res.json('categorie supprimée avec succès');
    }
    catch (error) {
        res.json({ error });
    }
})

categoryRouter.get('/getCategory/:id', async (req, res) => {//Route fonctionnelle

    try {
        console.log("rentre sur la route /getCategory/:id - uR 45");
        const getCategory = await prisma.category.findFirst({
            where: {
                idCategory: parseInt(req.params.id),

            },
            include: {
                icones: true, // Permet de récupérer les icones associées à la catégorie
            },
        })
        res.json({
            getCategory,
        })
    } catch (error) {
        res.json({ error });
    }
})

categoryRouter.get('/getCategories/:userId', async (req, res) => {//Route fonctionnelle

    try {
        console.log("rentre sur la route /getCategories - cR65");
        const getCategories = await prisma.category.findMany({
            where: {
                userIdKey: parseInt(req.params.userId),

            },
            include: {
                icones: true,
            }
        })
        res.json(
            getCategories
        )
    } catch (error) {
        res.json({ error });
    }

})

// Exemple route Express
categoryRouter.get('/getCategoriesByParent/:userId/:parentId', async (req, res) => {
    const { userId, parentId } = req.params;
    console.log(" cR96 rentre sur la route /getCategoriesByParent/:userId/:parentId");
    
    console.log(parentId);

    try {
        const categories = await prisma.category.findMany({
            where: {
                userIdKey: parseInt(userId),
                categoryParent: parentId ? parseInt(parentId) : null
            },
            include: {
                icones: true
            }
        });

        res.json(categories);
    } catch (err) {
        console.error("Erreur getCategoriesByParent", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


categoryRouter.put("/editPostCategory/:id", async (req, res) => {//Route fonctionnelle
    try {
        console.log("rentre dans la route /editPostCategory/:id - cR79");
        const existingCategory = await prisma.category.findUnique({ where: { idCategory: parseInt(req.params.id) } });
        const parent = req.body.categoryParent ? req.body.categoryParent : null;

        if (!existingCategory) {
            return res.status(404).json({ error: "category non trouvé" });
        }

        const category = await prisma.category.update({
            where: {
                idCategory: parseInt(req.params.id),
            },

            data: {
                categoryName: req.body.categoryName,
                categoryParent: parseInt(parent),
                icones: {
                    connect: { idIcone: parseInt(req.body.idIcone) }
                }

            }
        })

        res.json('category modifiée avec succès');
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
})





module.exports = categoryRouter;