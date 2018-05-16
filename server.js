const express = require('express')
const bodyParser = require('body-parser')
const db = require('./data/db.js')
const server = express()
const PORT = 4337

server.use(bodyParser({ extended: true }))
server.use(bodyParser.json())

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body

  if (!title || !contents)
  return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
// send request to database db.insert, get   then send response
  db.insert(req.body)
    .then (response => {
      res.status(200).json({...response, title, contents });
    })
    .catch(err => {
      res.status(500).json({err: err.message})
    })
})

server.get('/', (request, response) => {
  // console.log("GET REQUEST");
  response.send('<h1> GET REQUEST RECEIVED</h1>')
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json({ error: 'PROBLEM RETREIVING DATA' });
    })
});

server.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;

  db.findById(postId)
    .then(post => {
      res.json({ post });
      res.status(200).json({ post });
    })
    .catch(err => {
      res.status(500).json({ error: 'PROBLEM RETREIVING DATA' });
    })
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
