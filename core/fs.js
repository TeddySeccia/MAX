const fs = require('fs')
const path = require('path')

const deleteImage = (itemPath) => {


    if (itemPath) {
        const filePath = path.join(__dirname, '../', itemPath);
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Erreur suppression fichier :", err);
                } else {
                    console.log("Fichier supprimé :", filePath);
                }
            });
        } else {
            console.log("Le fichier n'existe pas :", filePath);
        }
    }
}

module.exports = deleteImage