const express = require('express')
const db = require('./data/db.js');
const bodyParser = require('body-parser');

const server = express();
// add your server code starting here

server.listen(3000,  () => {
    console.log('app is running on port 3000')
})

server.use(bodyParser.json());

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json({posts})
    })
    .catch(error => {
        res.status(500).json({error});
    })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(post => {
        res.status(200).json({post})
    })
    .catch(error => {
        res.status(500).json({error});
    })
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body

    if(!title) return res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    if(!contents) return res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    // console.log(title)
    // const posts = {...title, ...contents}
    // console.log(posts);
    const value = {title, contents}
    db.insert({...value})
    .then(post => {
        res.status(201).json({post});
    })
    .catch(error => {
        res.status(500).json({error});
    })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body
    const post = {title, contents}
    db.update(id, post)
    .then(posts => {
        res.status(200).json({posts});
    })
    .then(error => {
        res.status(500).json({error});
    })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(posts => {
        res.status(200).json({posts})
    })
    .catch(error => {
        res.status(500).json({error})
    })
})