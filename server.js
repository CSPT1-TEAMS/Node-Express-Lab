const express = require('express')
const bodyParser = require('body-parser')
const CORS = require('cors');
const db = require('./data/db.js');

const server = express()

server.use(bodyParser.json());
server.use(CORS());

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.json({posts})
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})
server.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  db.findById(postId)
    .then(post => {
      res.json({post})
    })
    .catch(error => {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
})

server.post('/api/posts', (req, res) => {
  const newPost = req.body;
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  db.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({error: "There was an error while saving the post to the database"})
    });
});

server.listen(5005, () => {
  console.log('Server is running on port 5005')
})