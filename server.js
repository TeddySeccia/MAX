const express = require('express');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/userRouter');
const documentRouter = require('./routes/documentRouter');
const categoryRouter = require('./routes/categoryRouter');
const themeRouter = require('./routes/themeRouter');
const tacheRouter = require('./routes/tacheRouter');
const folderRouter = require('./routes/folderRouter');
const iconeRouter = require('./routes/iconeRouter');


require('dotenv').config();


const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.static('./publics'));
app.use(express.json());
app.use(userRouter);
app.use(documentRouter);
app.use(categoryRouter);
app.use(themeRouter);
app.use(tacheRouter);
app.use(folderRouter);
app.use(iconeRouter);


app.listen(port, (err) => {
    if (err) {
        console.log('Error');
    } else {
        console.log('Server is running on port: ' + port); //ou (`Server is running on port ${port}`) ne pas oublier les backtiques et le ${}
    }
});



