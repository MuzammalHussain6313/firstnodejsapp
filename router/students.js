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
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(allStudents);
});

router.post('/newStudent', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students/newStudent" not "localhost:3000/newStudent";
    //req.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Origin', '*');
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

router.get('/studentId', async (req, res)=>{
    console.log(req.params.studentId);
    const student = await Student.findById(req.params.studentId);
    res.json(student);
});


router.patch('/:studentId', async (req, res)=>{
    console.log('id body', req.body);
    console.log('id recieve', req.params.studentId);
    var student = req.body;
    const updatedStudent = await Student.updateOne(
        { _id: req.params.studentId},
        { $set: student });
    res.send(updatedStudent);
});

router.delete('/:deleteStudent', async (req, res) => {
    try {
        console.log('body ' + req.body);
        const result = await Student.remove({ _id: req.params.deleteStudent});
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

module.exports = router;
