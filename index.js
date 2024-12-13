const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 1200
const mongoose = require('mongoose');
const bodyParser = require('body-parser');




// const uri = 'mongodb+srv://amirizew:dodo1111@cluster0.nib2hkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const uri = 'mongodb+srv://amirizew:Golda909@cluster0.x2cth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const uri = 'mongodb+srv://amirizew:gold123909@cluster0.nib2hkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

//database  connection
mongoose.connect(uri,).then(
    () => {console.log('connected successfull')}
  );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const questionRoutes = require('./routes/questions');




//MIDDLEWARES
app.set('view engine', 'ejs');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
app.use(function (req, res, next) {
    // req.header("Content-Type: application/x-www-form-urlencoded");
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods", " GET, POST, OPTIONS, PUT, PATCH, DELETE")
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
})



//ROUTES
app.use('/questions', questionRoutes);





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})