const express = require('express');

const router = express.Router();
const Property = require('../models/Property');
router.get('/', async (req, res)=>{
    // url to access thi sis "localhosta:3000/Propertys";
    res.send("blankPage of Property.");
});

router.get('/getProperties', async (req, res)=>{
    // url to access this is "localhosta:3000/Propertys/getPropertys" not "localhost:3000/getPropertys";
    console.log('test');
    const allProperties = await Property.find();
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(allProperties);
});

router.post('/newProperty', async (req, res)=>{
    // url to access thi sis "localhosta:3000/Propertys/newProperty" not "localhost:3000/newProperty";
    //req.setHeader('Access-Control-Allow-Origin', '*');
    const Property1 = new Property(req.body);
    console.log('Property', Property1);
    const result = await Property1.save();
    if (result) {
        res.send({
            message: "Property inserted successfully."
        });
    }
    res.send("Save a new Property will here.");
});

router.get('/:PropertyId', async (req, res)=>{
    console.log(req.params.PropertyId);

    const property = await Property.findById(req.params.PropertyId);
    res.json(property);
});

router.patch('/:PropertyId', async (req, res)=>{
    console.log(req.params.PropertyId);
    const property = await Property.updateOne(
        { _id: req.params.PropertyId},
        { $set : {owner: req.body.owner,
                type: req.body.type,
                area: req.body.area,
                price: req.body.price,
                contact: req.body.contactNumber,
                description: req.body.description,
                location: req.body.location}});
    res.json(property);
});

router.delete('/:deleteProperty', async (req, res) => {
    try {
        console.log('body ' + req.body);
        const result = await Property.remove({ _id: req.params.deleteProperty});
        if (result) {
            res.send({
                massage: 'Property deleted Successfully.'
            });
        }
    } catch (ex) {
        console.log('ex', ex);
        res.send({message: 'Error'}).status(401);
    }
});
module.exports = router;
