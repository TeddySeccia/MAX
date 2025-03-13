const { PrismaClient, Attribute } = require('@prisma/client');
const hashPassword = require('../services/extensions/hashPasswordExtension');
const bcrypt = require('bcrypt');
const upload = require('../core/multer')
const authguard = require('../services/authguard');
const documentRouter = require('express').Router();
const prisma = new PrismaClient({ log: ['error'] }) //si plusieurs extends, les concatener "new PrismaClient().$extends(ext1).$extends(ext2).$extends(ext3);"
const deleteImage = require('../core/fs');


documentRouter.get('/getDocument/:id', async (req, res) => { // 
    console.log("rentre sur la route /getDocument/:id - uR 11");
    try {
        const document = await prisma.document.findFirst({
            where: {
                idDocument: parseInt(req.params.id),
            }
        })
        res.json({
            document
        })
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
});

documentRouter.post("/editPostDocument/:id", upload.single('documentAvatar'), async (req, res) => {// 
    try {
        console.log("rentre sur la route /editPostDocument/:id - uR31");
        console.log(req.body);
        if (req.body.documentFName.match(/^[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{}|;:'",./?`~]*$/)) {
            const image = req.file ? req.file.filename : null;
            const document = await prisma.document.update({
                where: {
                    idDocument: parseInt(req.params.id),
                },

                data: {
                    documentName: req.body.documentName,
                    documentFName: req.body.documentFName,
                    documentMail: req.body.documentMail,
                    documentPassword: req.body.documentPassword,
                    documentBirthDate: new Date(req.body.documentBirthDate),
                    documentAdress: req.body.documentAdress,
                    documentTel: req.body.documentTel,
                    documentSex: req.body.documentSex,
                    documentAvatar: image

                }
            })
            res.json('Utilisateur modifié avec succès');
        }
        else throw ({ error: "firstName et computer ne peuvent contenir que des lettres et des chiffres" });
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
})

documentRouter.post('/addDocument', upload.single('documentAvatar'), async (req, res) => { // Route fonctionnelle
    try {
        console.log("rentre sur la route /addDocument - uR65");
        const documentReal = req.file ? req.file.filename : null;
        //data : {fields de droite "req.body.firstName" sont les memes que les "name" dans le formulaire il faut qu'ils s'appellent pareil} gauche db droite formulaire
        const documents = await prisma.document.create({
            data: {
                documentName: req.body.documentName,
                documentType: req.body.documentType,
                documentEditBy: req.body.documentEditBy || null,
                documentEditDate: req.body.documentEditDate|| null,
                documentAbout: req.body.documentAbout|| null,
                documentSize: req.file.size,
                documentExtension: req.file.mimetype.split("/")[1],
                documentPayNumber: req.body.documentPayNumber|| null,
                documentPayDate: req.body.documentPayDate|| null,
                documentAttribute: req.body.documentAttribute|| null,
                documentPath: req.file.path,
                documentAvatar: documentReal,
                userIdKey: parseInt(req.body.userIdKey),
                categoryIdKey: parseInt(req.body.idCategory)
            }
        })
        res.json('Document ajouté avec succès');
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
});

documentRouter.get("/deleteDocument/:id", async (req, res) => {// Route fonctionnelle
    try {
        console.log("rentre sur la route /deleteDocument/:idDocument - uR 95");
        const document = await prisma.document.findUnique({
            where: {
                idDocument: parseInt(req.params.id)
            },
        });

        if (!document) {
            return res.status(404).json({ error: "Icône non trouvée" });
        }

        const deleteDocument = await prisma.document.delete({
            where: {
                idDocument: parseInt(req.params.id),
            }
        })
        deleteImage(document.documentPath);
        res.json('Document supprimé avec succès');
    }
    catch (error) {
        res.json({ error });
    }
})


module.exports = documentRouter;




