// import your node modules
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(bodyParser.json())
server.use(express.json());


server.get('/api/posts',(req,res) => {
    db.find().then((posts) => {
        res.status(200).json(posts)
    })
})

server.get('/api/posts/:id',(req,res) => {
    db.findById(req.params.id).then( (post)=>
        {res.status(200).json(post)}
    )
})

server.post('/api/posts', (req,res) => {
    console.log('req.body is ',req.body)
    const{title, contents} = req.body;
    const post = req.body; 
    console.log(post)
    db.insert({title,contents}).then( (post) => {
             console.log(post)
              res.status(200).json({...post,title,contents})
    })
})



server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params
    

    db.findById(id).then(post => {
        if(post) {
            db.remove(id).then(response => {
                res.status(200).json({ msg: 'Post removed' });
            })
            .catch(err => {
                res.status(500).json({ error: 'Post could not be removed' });
            })
        }
    })
})

server.put('/api/posts/:id', (req,res) => {
    const {id} = req.params
     const {title,contents} = req.body
    if (!req.body.title || !req.body.contents){
        res.status(400).json({message:"Please provide title and contents for the post"})
    }
    db.update(id,req.body).then((post)=>{
        console.log(post)
        res.status(200).json({id:post,title,contents})
    })

})

server.listen(5000,() => {
    console.log('Listening on port 5000');
})
 
