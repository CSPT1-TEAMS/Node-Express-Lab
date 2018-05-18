const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
const db = require("./data/db.js");

const server = express();

server.use(bodyParser.json());
server.use(CORS());
server.listen(5000, () => {
  console.log("Server is running on port 5000");
});

server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json({
        posts
      });
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});
server.get("/api/posts/:id", (req, res) => {
  const postId = req.params.id;
  db
    .findById(postId)
    .then(post => {
      res.json({
        post
      });
    })
    .catch(error => {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    });
});

server.post("/api/posts", (req, res) => {
  const newPost = req.body;
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db
    .insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  db
    .findById(id) //will return only one item
    .then(posts => {
      db
        .remove(id)
        .then(foundRes => {
          res.status(200).json({
            posts
          });
        })

        .catch(error => {
          res.status(500).json({
            error: "The post could not be removed"
          });
        });
    })
    .catch(error => {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const updatedPost = req.body;

  if (!updatedPost.title || !updatedPost.contents)
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  db.update(id, updatedPost)
    .then(updated => {
      db.findById(id) //b/c they wrote the data base, only one returning 
      .then(posts => {
        res.status(200).json({posts })
      })
      .catch(err => {
            res.status(404).json({
              message: "The post with the specified ID does not exist."
            })
       })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be modified." })
      })
})
})

 
 
