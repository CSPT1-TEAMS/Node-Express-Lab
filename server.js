// import your node modules
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(bodyParser.json())
server.use(express.json());

server.post('/api/posts', (req,res) => {
    console.log('req.body is ',req.body)
    const post = req.body; 
    console.log(post)
    
    db.insert(post).then( (post) => {
        res.status(200).json(post)
    })
})

server.listen(5000,() => {
    console.log('Listening on port 5000');
})
 
