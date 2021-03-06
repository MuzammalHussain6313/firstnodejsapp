 const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/studentDB', {useNewUrlParser: true}, ()=>console.log('connected'));

mongoose.connect('mongodb+srv://muzammal6313:ashrafi9885@cluster0-4hc2l.mongodb.net/studentDB?retryWrites=true&w=majority',
    {useNewUrlParser: true}).then(() => console.log('connected')).catch(err =>{
    console.log(err);});

const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const postsRoute = require('./router/posts');
const studentRoute = require('./router/students');
const userRoute = require('./router/users');
const propertyRoute = require('./router/properties');

//app.use('/router')(router);
app.use('/students', studentRoute);
app.use('/parent-url-posts', postsRoute);
app.use('/users', userRoute);
app.use('/properties', propertyRoute);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.post('/login', async (req, res) => {
    const body = req.body;
    console.log('req.body', body);
    const email = body.email;
    // lets check if email exists
    const result = await Student.findOne({"email": email});
    if (!result) // this means result is null
    {
        res.status(401).send({
            Error: 'This user doesnot exists. Please signup first'
        });
    } else {
        // email did exist
        // so lets match password
        if (body.password === result.password) {
            // great, allow this user access
            console.log('match');
            res.send({message: 'Successfully Logged in'});
        } else {
            console.log('password doesnot match');
            res.status(401).send({message: 'Wrong email or Password'});
        }
    }
});

app.post('/signup', async (req, res) => {
    const body = req.body;
    console.log('req.body', body);
    res.send({
        message: 'Success'
    });

});
app.listen(process.env.PORT || 5000, () => {
    console.log('Express application running on ');
});
