const express = require('express')
const bodyParser = require('body-parser')
const db = require('./data/db.js')
const app = express()
const PORT = 4337

app.use(bodyParser({ extended: true }))
app.use(bodyParser.json())

app.post('/api/posts', (req, res) => {
  const { title, contents } = req.body

  if (!title || !contents)
    return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

  console.log('in post route')
  console.log(title)
  console.log(contents)

  return res.status(200)
})

server.get('/', (request, response) => {
  // console.log("GET REQUEST");
  response.send('<h1> GET REQUEST RECEIVED</h1>')
})

server.get('/api/users', (req, res) => {
  db.find()
  .then( users => {
    res.status(200).json({users})
  })
  .catch( err => {
     res.status(500).json({error: 'PROBLEM RETREIVING DATA'});
  })
});

server.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  
  db.findById(userId)
    .then( user => {
      res.json({ user });
      res.status(200).json({user });
    })
    .catch( err => {
      res.status(500).json({ error: 'PROBLEM RETREIVING DATA' });
    })
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`))




