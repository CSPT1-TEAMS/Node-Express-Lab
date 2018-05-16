const express = require('express');
const db = require('./data/db.js');
const server = express();



server.listen(5000, () => {
    console.log('=== APP running on port 5000 ===')
})

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