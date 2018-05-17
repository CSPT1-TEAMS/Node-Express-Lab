const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');
const helmet = require('helmet');
const server = express();


server.listen(5000, () => {
    console.log('=== APP running on port 5000 ===')
})
server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/api/posts', function (req, res) { 
    db.find()
    .then( posts => {
        res.json({ posts })
    })
    .catch( error => {
        res.status(500).json({ 
            error: "The posts information could not be retrieved." 
        })
    }) 
})

server.get('/api/posts/:id', function (req, res) {
    const postId = req.params.id;
    db.findById(postId)
        .then( post => {
            res.json({ post })
        })
        .catch(error => {
            if (res.statusCode === 404) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                 })
            } else {
                res.status(500).json({
                    error: "The posts information could not be retrieved."
                })
            }

        })
})

server.post('/api/posts', (req, res) => {
    const newPost = req.body;
    db.insert(newPost)
        .then(post => {
            res.status(201).json({ post });
        })
        .catch(err => {
            if (res.statusCode === 400) {
                res.status(400).json({
                    errorMessage: "Please provide title and contents for the post."
                })
            } else {
                res.status(500).json({
                    error: "There was an error while saving the post to the database"
                })
            }
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let post;
    db.findById(id)
    .then( foundPost => {
        post = {...foundPost};
        return db.remove(id)

    })
    .then( () => {
        res.status(201).json({ post });
    })
        .catch( err=> {
            if (res.statusCode === 404) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            } else {
                res.status(500).json({
                    error: "The post could not be removed"
                })
        }})
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;

    db.update(id, updatedPost)
        .then( (updated) => {
            if (updated > 0) {
                db.findById(id)
                .then(post => {
                    res.status(200).json({ post });
                })
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err => {
                res.status(500).json({
                    error: "The posts information could not be retrieved."
                })
            }
        )
})