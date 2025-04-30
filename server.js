const cookieParser = require('cookie-parser');
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
const checkTokenRouter = require('./routes/checkTokenRouter')
const childrenRouter = require('./routes/childrenRouter')
const refreshTokenRouter = require('./routes/refreshTokenRouter')




require('dotenv').config();


const port = process.env.PORT;

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.static('./publics'));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(documentRouter);
app.use(categoryRouter);
app.use(themeRouter);
app.use(tacheRouter);
app.use(folderRouter);
app.use(iconeRouter);
app.use(checkTokenRouter);
app.use(refreshTokenRouter)
app.use(childrenRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.listen(port, (err) => {
    if (err) {
        console.log('Error');
    } else {
        console.log('Server is running on port: ' + port); //ou (`Server is running on port ${port}`) ne pas oublier les backtiques et le ${}
    }
});



