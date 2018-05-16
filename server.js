const express = require('express');

const db = require('./data/db.js');

const server = express();
 
server.listen(5000, () => { //server is listening on this port for requests
    console.log('=== APP RUNNING ON PORT 5000 ===')
})


server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json({posts})
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

server.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;

    db.findById(id)
    .then(post => {
        res.status(200).json({post});
    })
    .catch(err => {
        res.status(500).json({error: 'ID NOT FOUND'});
    })
})

server.post('/api/posts', (req, res) => {
    const {title, content} = req.body;
    const newPost = {title, content, id: postId};

    if (!title || !content) {
        return sendUserError(
          'TITLE AND CONTENT ARE REQUIRED',
          res
        );
      }
      const findPostById = (post) => {
        return post.title === title;
      };
      if (posts.find(findPostById)) {
        return sendUserError(
          `Sorry, ${title} already exists in the database.`,
          res
        );
      }
     
      posts.push(newPost);
      postId++;
      res.json(posts);
     

    // res.send('POST request to the homepage')
})

server.put('/api/posts/:id', (req, res) => {
    res.send('Update the book')
})

server.delete('/api/posts/:id', (req, res) => {
    res.send('Update the book')
})
