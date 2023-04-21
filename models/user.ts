const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  displayName: String,
  role: String
})

export const User = mongoose.model('User', userSchema)
