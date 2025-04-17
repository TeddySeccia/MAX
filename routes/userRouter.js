const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { PrismaClient, Role, Genre } = require('@prisma/client');
const hashPassword = require('../services/extensions/hashPasswordExtension');
const upload = require('../core/multer')
const authguard = require('../services/authguard');
const deleteImage = require('../core/fs');
const userRouter = require('express').Router();
const prisma = new PrismaClient({ log: ['error'] }).$extends(hashPassword) //si plusieurs extends, les concatener "new PrismaClient().$extends(ext1).$extends(ext2).$extends(ext3);"
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

userRouter.get('/getUser', authguard, async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await prisma.user.findUnique({
            where: { idUser: userId }
        });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
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
        console.log("userRouter 87 req.body", req.body);

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
                    theme: {
                        connect: { idTheme: 1 } // ← Option 2 (relation correcte)
                      },
                    userAvatar: image,
                    userAvatarPath: imagePath,


                }
            })
            console.log(image);
            console.log("117");


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

userRouter.post('/login', async (req, res) => {//Route fonctionnelle
    try {
        console.log("rentre sur la route /login - uR 160");

        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                userMail: email,
            }
        })

        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.userPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        const token = jwt.sign(
            { userId: user.idUser, email: user.userMail }, // Payload
            process.env.JWT_SECRET, // Clé secrète
            { expiresIn: process.env.JWT_EXPIRES_IN } // Expiration
        );
        console.log("token créé 183uR ",token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60, // 1 heure
            expires: new Date(Date.now() + 1000 * 60 * 60) // expire dans 1 heure
        });

        res.json({ message: "Connexion réussie", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur interne uR196" })
    }
})

userRouter.post('/logout', async (req, res) => {// A terminer quand on saura comment gerer les tokens
    try {
        console.log("rentre sur la route /logout - uR 154");

        // Côté backend, les JWT ne sont pas stockés, donc on ne peut pas "supprimer" un token
        // La déconnexion consiste à faire en sorte que le frontend "oublie" le token
        res.json({ message: "Déconnexion réussie" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la déconnexion" });
    }
});



module.exports = userRouter;




