const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/studentDB', {useNewUrlParser: true}, ()=>console.log('connected'));

mongoose.connect('mongodb+srv://muzammal6313:ashrafi9885@cluster0-4hc2l.mongodb.net/studentDB?retryWrites=true&w=majority',
                 {useNewUrlParser: true},
    ()=>console.log('connected'));

const Student = mongoose.model('Student', {
    name: String,
    student_id: Number,
    email: String
});

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

app.use('/students', studentRoute);
app.use('/parent-url-posts', postsRoute);
app.use('/users', userRoute);
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
    //console.log('req.body', body)
    try {
        const student = new Student(body);
        const result = await student.save();
        res.send({
            message: 'Student signup successful'
        });
    } catch (ex) {
        console.log('ex', ex);
        res.send({message: 'Error'}).status(401);
    }
});
app.post('/saveStudent', async (req, res) => {
    const student = new Student(req.body);
    console.log('student', student);
    const result = await student.save();
    if (result) {
        res.send({
            message: "Student inserted successfully."
        });
    }
});
app.post('/updateStudent', async (req, res) => {
    try {
        const student = new Student(req.body);
        console.log('student', student);
        const result = await student.updateOne();
        if (result) {
            res.send({
                massage: "Student Update Successfully"
            });
        }
    } catch (ex) {
        console.log('ex', ex);
        res.send({message: 'Error'}).status(401);
    }
});
app.post('/deleteStudent', async (req, res) => {
    try {
        const student = new Student(req.body);
        const result = await student.delete();
        if (result) {
            res.send({
                massage: 'Student deleted Successfully.'
            });
        }
    } catch (ex) {
        console.log('ex', ex);
        res.send({message: 'Error'}).status(401);
    }
});
app.get('/getStudents', async (req, res) => {
    const allStudents = await Student.find();

    console.log('allStudents', allStudents);
    res.send(allStudents);
})
app.listen(3000, () => {
    console.log('Express application running on localhost:3000');
    //res.setHeader('Access-Control-Allow-Origin', '*');
    //res.send(allStudents);
})
app.listen(process.env.PORT || 5000, () => {
    console.log('Express application running on ');

});
