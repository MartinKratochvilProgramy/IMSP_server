import { Request, Response } from 'express'
import { createToken } from '../utils/jtw'
import { User } from '../models/user'
const bcrypt = require('bcrypt')

export default async function register (req: Request, res: Response) {
  // create user account, return 500 err if no password or username given
  let { email, password, displayName } = req.body
  const role = 'user'

  // find if user exists, if yes send 500 err
  const existingUser = await User.findOne({ email }).exec()
  if (existingUser) {
    res.status(500)
    res.json({
      message: 'User already exists'
    })
    return
  }

  try {
    // create user in db with hashed password
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    await User.create({ email, password, displayName, role })

    const user = await User.findOne({ email }).exec()

    const accessToken = createToken({
      id: user._id
    })

    res.json({
      message: 'Success',
      email,
      role,
      token: accessToken
    })
  } catch (error) {
    console.log('err on register: ', error)
  }
};
