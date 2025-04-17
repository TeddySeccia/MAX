const { PrismaClient } = require('@prisma/client');
const upload = require('../core/multer')
const authguard = require('../services/authguard');
const childrenRouter = require('express').Router();
const prisma = new PrismaClient({ log: ['error'] }) //si plusieurs extends, les concatener "new PrismaClient().$extends(ext1).$extends(ext2).$extends(ext3);"


childrenRouter.get('/getCategoriesAndDocs/:userId/:parentId', async (req, res) => {
    const { userId, parentId } = req.params;
  
    try {
      const categories = await prisma.category.findMany({
        where: {
          userIdKey: parseInt(userId),
          categoryParent: parseInt(parentId)
        },
        include: {
          icones: true
        }
      });
  
      const documents = await prisma.document.findMany({
        where: {
          userIdKey: parseInt(userId),
          categoryIdKey: parseInt(parentId)
        },
        include: {
          icones: true // si tu veux aussi l’icône
        }
      });
      console.log("children 31 categories", categories);
      console.log("children 31 documents", documents);
      res.json({
        categories,
        documents,
        
        
      });
    } catch (err) {
      console.error("Erreur getCategoriesAndDocs", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });
  
  module.exports = childrenRouter;