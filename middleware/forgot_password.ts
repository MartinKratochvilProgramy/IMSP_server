import { Request, Response } from 'express'
import { User } from '../models/user'

export default async function forgotPassword (req: Request, res: Response) {
  // validate user account on login
  const { email } = req.body

  try {
    const user = await User.findOne({ email }).exec()
    if (!user) {
      res.status(403)
      res.json({
        message: 'User does not exist'
      })
      return
    }

    res.json({
      message: 'Success',
      email
    })

    console.log(`reset password for user: ${email}`)
  } catch (error) {
    console.log('err on login: ', error)
  }
};
