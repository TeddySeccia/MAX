const { Prisma } = require('@prisma/client');
const bcrypt = require('bcrypt');

const createHashPassword = (modelName) => ({
    [modelName]: {
        create: async ({ args, query }) => {
            try {
                const hash = await bcrypt.hash(args.data.userPassword, 10);
                args.data.userPassword = hash;
                return query(args);
            } catch (error) {
                throw error;
            }
        }, 
        update: async ({ args, query }) => {
            try {
                if (args.data.userPassword) {
                    const hash = await bcrypt.hash(args.data.userPassword, 10);
                    args.data.userPassword = hash;
                }
                return query(args);
            } catch (error) {
                throw error;
            }
        }
    }
});

module.exports = Prisma.defineExtension({
    name: "hashPassword",
    query: {
        
        ...createHashPassword("user"),
    }
});