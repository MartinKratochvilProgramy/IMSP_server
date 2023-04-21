import { login, register, getRole, forgotPassword } from './middleware'
import validateAuth from './middleware/validate_auth'
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config() // this loads env vars

app.use(express.json())

app.use(cors({
  origin: '*'
}))

const PORT = process.env.PORT || 4000
const DATABASE_ROUTE = process.env.MONGO_URI

app.post('/login', login)
app.post('/register', register)
app.post('/forgot_password', forgotPassword)
app.get('/get_role', getRole)
app.get('/validate_auth', validateAuth)

mongoose.connect(DATABASE_ROUTE, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  app.listen(PORT, () => {
    console.log(`Connected @ ${PORT}`)
  })
})
