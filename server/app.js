const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()

// allow cross-origin requests
app.use(cors())

dotenv.config()
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true }
)
mongoose.connection.once('open', () => {
  console.log('Connected to database')
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.listen(4000, () => console.log('Server is running on port 4000'))
