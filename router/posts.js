const express = require('express');

const router = express.Router();
router.get('/', async (req, res)=>{
    // url to access thi sis "localhosta:3000/posts";
    res.send("posts / blanck.");
});

router.get('/newPosts', async (req, res)=>{
    // url to access thi sis "localhosta:3000/posts/newposts" not "localhost:3000/newPosts";
    res.send("new posts will apear here.");
});

router.get('/oldPosts', async (req, res)=>{
    // url to access thi sis "localhosta:3000/posts/oldposts" not "localhost:3000/oldPosts";
    res.send("old posts will apear here.");
});
module.exports = router;
