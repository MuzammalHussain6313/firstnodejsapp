const express = require('express');

const router = express.Router();
const Student = require('../models/Student');
router.get('/', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students";
    res.send("blankPage of students.");
});

router.get('/getStudents', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students/getStudents" not "localhost:3000/getStudents";
    const allStudents = await Student.find();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(allStudents);
});

router.post('/newStudent', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students/newStudent" not "localhost:3000/newStudent";
    req.setHeader('Access-Control-Allow-Origin', '*');
    const student1 = new Student(req.body);
    console.log('student', student1);
    const result = await student1.save();
    if (result) {
        res.send({
            message: "Student inserted successfully."
        });
    }
    res.send("Save a new student will here.");
});

router.get('/:studentId', async (req, res)=>{
    console.log(req.params.studentId);
    const student = await Student.findById(req.params.studentId);
    res.json(student);
});

router.patch('/:studentId', async (req, res)=>{
    console.log(req.params.studentId);
    const student = await Student.updateOne(
        { _id: req.params.studentId},
        { $set : {name: req.body.name}});
    res.json(student);
});


module.exports = router;
