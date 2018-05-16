const express = require('express')
const db = require('./data/db.js');

const server = express()

server.get('/api/posts')
server.get('/api/posts/:id')

server.listen(5005, () => {
  console.log('Server is running on port 5005')
})