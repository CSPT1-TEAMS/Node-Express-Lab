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

app.listen(PORT, () => console.log(`listening on port ${PORT}`))




