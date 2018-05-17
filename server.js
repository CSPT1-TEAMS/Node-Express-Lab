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
        res.status(500).json({error: "The posts information could not be retrieved."});
    })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(post => {
        res.status(200).json({post})
    })
    .catch(error => {
        res.status(500).json({message: "The post with the specified ID does not exist." });
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
        res.status(200).json({...post, title, contents});
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be modified." });
    })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body
    const post = {title, contents}
    db.update(id, post)
        .then( updated => {
            if(updated > 0) {
                db.findById(id)
                    .then(post => {
                        res.status(200).json({post});
                    })
            } else {
                return res.sendStatus(404);
            }
        })
        .catch(error => res.status(500).json({error}))

    // .then(posts => {
    //     res.status(200).json({posts});
    // })
    // .then(error => {
    //     res.status(500).json({error});
    // })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let user;
    
    db.findById(id)
    .then(foundUser => {
        user = {...foundUser};
        return db.remove(id)
    })
    .then( () => {
        res.status(204).json(user);
    })
    .catch(error => {
        res.status(500).json({error})
    })

})