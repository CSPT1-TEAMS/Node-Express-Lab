const bodyParser = require('body-parser');
const cors = require('cors');
// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(bodyParser.json());
server.use(cors());
// add your server code starting here
server.listen(5000, () => {
    console.log('**Server running on port 5000**');
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json({ posts })
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;

    db.findById(postId)
        .then(post => {
            res.json({ post })
        })
        .catch(err => {
            res.status(500).json({ message: "The post with the specified ID does not exist." })
        })
})

const sendUserError = (msg, res) => {
    res.status(400);
    res.json({ errorMessage: msg });
    return;
};

server.post('/api/posts', (req, res) => {
    // console.log(req);
    const title = req.body.title;
    const contents = req.body.contents;
    const newPost = { title: title, contents: contents };
    if (!title || !contents) {
        return sendUserError("Please provide title and contents for the post.", res)
    }

    db.insert(newPost)
        .then(post => {
            res.status(201).json({ post })
            return newPost;
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
});

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const contents = req.body.contents;
    const newPost = { title: title, contents: contents }

    if (!title || !contents) {
        return sendUserError("Please provide title and contents for the post.", res);
    }

    db.findById(id)
        .then(post => {
            console.log(post)
        })
        .catch(err => {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        });
    db.update(id, newPost)
        .then(post => {
            res.status(200).json({ newPost })
        })    
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." })
        })


    // if (foundPost.length === 0) {
    //     return sendUserError("The post with the specified ID does not exist.", res);
    // }
    // else {
    //     foundPost.title = title;
    //     foundPost.contents = contents;
    //     res.json(foundPost)
    // }
})

