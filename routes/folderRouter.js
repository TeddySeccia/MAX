const { PrismaClient } = require('@prisma/client');
const hashPassword = require('../services/extensions/hashPasswordExtension');
const bcrypt = require('bcrypt');
const upload = require('../core/multer')
const authguard = require('../services/authguard');
const folderRouter = require('express').Router();
const prisma = new PrismaClient({ log: ['error'] })











module.exports = folderRouter;