const express = require('express')
const bodyParser = require('body-parser')
const db = require('./data/db.js')
const server = express()
const PORT = 4337
const helmet = require('helmet')
const cors = require('cors');

server.listen(PORT, () => console.log(`listening on port ${PORT}`));

//add middleware
server.use(helmet()); // call before cors and express
server.use(cors());  // call before express
server.use(express.json())
server.use(bodyParser({ extended: true }))
server.use(bodyParser.json())

// server routes
  server.get('/', (request, response) => {
    // console.log("GET REQUEST");
    response.send('<h1> GET REQUEST RECEIVED</h1>')
  })  
  
  server.get('/api/users', (req, res) => {
    db.find()
      .then( users => {
        res.status(200).json({users});
      })  
      .catch(err => {
        res.status(500).json({ error: 'PROBLEM RETREIVING DATA' });
      })  
  });    

server.post('/api/users', (req, res) => {
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


server.get('/api/users/:id', (req, res) => {
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

//Query string : http://locahost:4337/api/users?id=2
//search?sort=asc&search=trees
//re  .body ={}
//req.query = { sort: 'asc', search 'trees'}
server.delete('/api/users/:id', (req, res)  => {
  const { id } = req.query
  let user;
  db.remove(id)
    .then( foundUser => {
      user = {...foundUser};
      return db.remove(id)
    })
    .then( () => {
      res.status(200).json(user);
    })
    .catch(err => response.status(500).json({ err }))
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  db.update(id, updatedUser)
  .then( updated => {
    if( updated > 0 ){
      db.findById(id)
      .then( user =>{
        res.status(200).json(user);
      })
    } else {
      return res.sendStatus(404);
    }
  })
  .catch(err => response.status(500).json({ err }))
})