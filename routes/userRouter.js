const { PrismaClient, Role, Genre } = require('@prisma/client');
const hashPassword = require('../services/extensions/hashPasswordExtension');
const upload = require('../core/multer')
const authguard = require('../services/authguard');
const deleteImage = require('../core/fs');
const userRouter = require('express').Router();
const prisma = new PrismaClient({ log: ['error'] }).$extends(hashPassword) //si plusieurs extends, les concatener "new PrismaClient().$extends(ext1).$extends(ext2).$extends(ext3);"
const path = require('path');

userRouter.get('/getUser/:id', async (req, res) => { //Route fonctionnelle
    console.log("rentre sur la route /getUser/:id - uR 11");
    try {
        const user = await prisma.user.findFirst({
            where: {
                idUser: parseInt(req.params.id),
            }
        })
        res.json({
            user,
            title: "Accueil",
        })
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
});

userRouter.put("/editPostUser/:id", upload.single('userAvatar'), async (req, res) => {//Route fonctionnelle
    try {
        console.log("rentre sur la route /editPostUser/:id - uR31");
        console.log("32", req.body);
        
        

        const existingUser = await prisma.user.findUnique({ where: { idUser: parseInt(req.params.id) } });
        if (!existingUser) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        if (req.body.userFName.match(/^[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{}|;:'",./?`~]*$/)) {
            const image = req.file ? req.file.filename : "iconeAvatar-1741876409054-461400216.png";
            const imagePath = req.file ? req.file.path : path.join(__dirname, 'public', 'uploads', 'META_icones', 'iconeAvatar-1741876409054-461400216.png');

            const user = await prisma.user.update({
                where: {
                    idUser: parseInt(req.params.id),
                },

                data: {
                    userName: req.body.userName,
                    userFName: req.body.userFName,
                    userMail: req.body.userMail,
                    userPassword: req.body.userPassword,
                    userBirthDate: req.body.userBirthDate ? new Date(req.body.userBirthDate) : null,
                    userAdress: req.body.userAdress,
                    userTel: req.body.userTel,
                    userSex: req.body.userSex,
                    userAvatar: image,
                    userAvatarPath: imagePath,

                }
            })
            if (image !== existingUser.userAvatar) {
                deleteImage(existingUser.userAvatarPath);
            }
            res.json('Utilisateur modifié avec succès');
        }
        else throw ({ error: "firstName et computer ne peuvent contenir que des lettres et des chiffres" });
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
})

userRouter.post('/addUser', upload.single('userAvatar'), async (req, res) => { //Route fonctionnelle
    /*.setItem('firstName', req.body.firstName); si on veut stocker des données dans le localStorage
    localStorage.getItem('firstName');
    localStorage.clear();
    sessionStorage.setItem('firstName', req.body.firstName); si on veut stocker des données dans le sessionStorage*/
    try {
        console.log("rentre sur la route /addUser - uR69");
        console.log("FICHIER UPLOADE :", req.file);

        if (req.body.userPassword !== req.body.confirmPassword) {
            throw ({ confirmPassword: "Les mots de passe ne correspondent pas" });
        } else {

            const image = req.file ? req.file.filename : "iconeAvatar-1741876409054-461400216.png";
            const imagePath = req.file ? req.file.path : path.join(__dirname, 'public', 'uploads', 'META_icones', 'iconeAvatar-1741876409054-461400216.png');


            const users = await prisma.user.create({
                //data : {fields de droite "req.body.firstName" sont les memes que les "name" dans le formulaire il faut qu'ils s'appellent pareil} gauche db droite formulaire
                data: {
                    userName: req.body.userName,
                    userFName: req.body.userFName,
                    userMail: req.body.userMail,
                    userPassword: req.body.userPassword,
                    userBirthDate: req.body.userBirthDate ? new Date(req.body.userBirthDate) : null,
                    userAdress: req.body.userAdress,
                    userTel: req.body.userTel,
                    userSex: req.body.userSex,
                    userAvatar: image,
                    userAvatarPath: imagePath,

                }
            })
            res.json('Utilisateur ajouté avec succès');

        }
    } catch (error) {
        console.log(error);

        if (error.code === "P2002") {
            error = { mail: "L'adresse mail est déjà utilisée" };
        }
        res.json({ error });
    }

});

userRouter.get("/deleteUser/:id", async (req, res) => {//Route fonctionnelle
    try {
        console.log("rentre sur la route /deleteUser/:id - uR 115");
        const user = await prisma.user.findUnique({
            where: {
                idUser: parseInt(req.params.id)
            },
        });
        if (!user) {
            return res.status(404).json({ error: "Icône non trouvée" });
        }
        const deleteUser = await prisma.user.delete({
            where: {
                idUser: parseInt(req.params.id),
            }
        })
        deleteImage(user.userAvatarPath)
        res.json('Utilisateur supprimé avec succès');
    }
    catch (error) {
        res.json({ error }, "Erreur suppression utilisateur 147");
    }
})



module.exports = userRouter;




