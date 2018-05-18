// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(express.json());
server.listen(5000, ()=> {
  console.log('\n ===API running on port 5000===\n');
})

// server.get('/', (req, res) => {
//   res.status(200).json({msg: 'connected'})
// })

server.get('/api/posts', (req, res) => {
   db.find()
   .then( posts => res.status(200).json(posts))
   .catch( err => res.status(500).json({err}))
})

server.get('/api/posts/:id', (req, res) => {
  const {id} = req.params;
  db.findById(id)
  .then(post => res.status(200).json({post: posts[0]}))
  .catch( err => res.status(500).json({err}))
  
})

server.post('/api/posts', (req, res) => {
  const postBody = req.body;
  if(postBody.title === undefined || postBody.contents === undefined){
    return res.status(400).json({errorMessage: "Please provide title and contents for the post."})
  }
  db
    .insert(postBody)
    // .then( post => { res.status(201).json(post)})
    .then( post => {
      db.findById(post.id)
      .then( post => res.status(201).json(post))
      .catch(err => err => res.status(500).json({ error: "There was an error while saving the post for the database" }));
    })
    .catch(err => res.status(500).json({ error: "There was an error while saving the post for the database" }));
})

server.delete('/api/posts/:id', (req, res) => {
  const {id} = req.params
  let foundPost;
  db
    .findById(id)
    .then(posts => {
      if (posts.length === 0) {
        res
          .status(404)
          .json({
            message: "The post with the specified ID does not exist."
          });
      } else {
        foundPost = posts[0];
        db
          .remove(id)
          .then(numOfDeleted => {
            res.status(200).json(foundPost);
          })
          .catch(err =>
            res.status(500).json({ error: "The post could not be removed" })
          );
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    )
})

server.put('/api/posts/:id', (req, res) => {
  const { id} = req.params;
  const postBody = req.body;
  if ( postBody.title === undefined && postBody.contents === undefined) {
    return res.status(400).json({ errorMessage: "Please provide title or contents for the posts."})
  }
  db.update(id, postBody)
  .then( num => {
    if(num === 0) {
      res.status(404).json({ message: "the post with the specified id does not exist."})
    } else {
      db.findById(id)
      .then( post => res.status(200).json(post))
      .catch(err => res.status(500).json({error: "the post information could not be modified."}))
    }
  })
  .catch(err => res.status(500).json({error: "the post information could not be modified."}))
})