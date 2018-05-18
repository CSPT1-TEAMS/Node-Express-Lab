const express = require('express')
const db = require('./data/db.js');
const bodyParser = require('body-parser');

const server = express();


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
        res.status(500).json({error: "The posts information could not be retrieved."});
    })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    
    db.findById(id)
    .then(post => {
        if(post.length < 1 ) { return res.status(404).json({message: "The post with the specified ID does not exist."})}
        else {  return res.status(200).json({post})     }
   
    })
    .catch(error => {
        res.status(500).json({error: "The post information could not be retrieved." });
    })
 
})

server.post('/api/posts', (req, res) => {
    const { title, contents, id } = req.body

    if(!title) return res.status(400).json({errorMessage: "Please provide title for the post."})
    if(!contents) return res.status(400).json({errorMessage: "Please provide contents for the post."})

    const value = {title, contents}
    db.insert({...value})
    .then(post => {
        res.status(200).json({...post, title, contents});
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be modified." });
    })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body
    if(!title) return res.status(400).json({errorMessage: "Please provide title for the put."})
    if(!contents) return res.status(400).json({errorMessage: "Please provide contents for the put."})
    const post = {title, contents}

    db.update(id, post)
        .then( updated => {
            if(updated > 0) {
                db.findById(id)
                    .then(post => {
                        res.status(200).json({post});
                    })
            } else {
                return res.status(404).json({message: "The post with the specified ID does not exist."});
            }
        })
        .catch(error => res.status(500).json({error: "The post information could not be modified."}))

  
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let user;
  
    db.findById(id)
    .then(foundUser => {
        if(foundUser.length < 1 ) { return res.status(404).json({message: "The post with the specified ID does not exist."})}
        else {
            user = {...foundUser[0]};
            return db.remove(id)
                    .then(() => {
                        res.status(200).json(foundUser);
                    })
    }
    })
    .catch(error => {
        res.status(500).json({error: "The post could not be removed"})
    })

})