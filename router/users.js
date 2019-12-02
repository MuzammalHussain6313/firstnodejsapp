
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req,res)=>{
    res.send("That is default page of the Users endpoint.")
})
router.post('/signup', async (req, res) => {

    try{
        const body = req.body;
        var salt = await bcrypt.genSaltSync(10);
        const password = await body.password;
        var hash = bcrypt.hashSync(password, salt);

        // bcrypt.genSalt(10, function(err, salt) {
        //     bcrypt.hash(req.body.password, salt, function(err, hash) {
        //         // Store hash in your password DB.
        //     });
        // });
        console.log('hash - > ', hash);
        //console.log('body ===== ', req.body);
        body.password = hash;
        const user = new User(body);
        console.log('user', user);
        const result = await user.save();
        res.send({
          message: 'User signup successful'
        });
    }
    catch(ex){
        console.log('ex',ex)
        res.send({
            message: 'Error',
            detail: ex
        }).status(500);
    }
});

router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;
        // lets check if email exists
        const result = await User.findOne({ email: email });
        //result.password = undefined;

        if (!result) {
            // this means result is null
            res.status(401).send({
                Error: 'This user doesnot exists. Please signup first'
            });
        } else {
            // email did exist
            // so lets match password
            if ( bcrypt.compareSync(body.password, result.password)) {
                // great, allow this user access
                console.log('match');
                //delete result['password']; //It is not working so, I'm using
                result.password = undefined;
                console.log('pass', result.password);
                const token = jsonwebtoken.sign({
                    data: result,
                    role: 'User'
                }, 'supersecretToken', { expiresIn: '7d' });
                console.log('token -> ', token);

                res.send({ message: 'Successfully Logged in', token: token });
            } else {
                console.log('password doesnot match');
                res.status(401).send({ message: 'Wrong email or Password' });
            }
        }
    } catch (ex) {
        console.log('ex', ex);
    }
});


router.get('/getUsers', async (req, res)=>{
    const allUsers = await User.find();
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(allUsers);
    });
module.exports = router;
