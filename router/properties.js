const express = require('express');

const router = express.Router();
const Property = require('../models/Property');
router.get('/', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students";
    res.send("blankPage of Property.");
});

router.get('/getProperties', async (req, res)=>{
    // url to access this is "localhosta:3000/students/getStudents" not "localhost:3000/getStudents";
    console.log('test');
    const allProperties = await Property.find();
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(allProperties);
});

router.post('/newProperty', async (req, res)=>{
    // url to access thi sis "localhosta:3000/students/newStudent" not "localhost:3000/newStudent";
    req.setHeader('Access-Control-Allow-Origin', '*');
    const Property1 = new Property(req.body);
    console.log('Property', Property1);
    const result = await Property1.save();
    if (result) {
        res.send({
            message: "Student inserted successfully."
        });
    }
    res.send("Save a new student will here.");
});

router.get('/:PropertyId', async (req, res)=>{
    console.log(req.params.PropertyId);
    const Property = await Property.findById(req.params.PropertyId);
    res.json(Property);
});

router.patch('/:PropertyId', async (req, res)=>{
    console.log(req.params.PropertyId);
    const Property = await Property.updateOne(
        { _id: req.params.PropertyId},
        { $set : {"owner": req.body.owner,"price": req.body.price, "type": req.body.type}});
    res.json(Property);
});

module.exports = router;
