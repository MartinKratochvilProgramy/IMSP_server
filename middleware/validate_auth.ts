import { Request, Response } from 'express'
import { User } from '../models/user'
import { createToken, verifyToken } from '../utils/jtw'

export default async function validateAuth (req: Request, res: Response) {
  // send stocks to client
  const { authorization } = req.headers

  if (!authorization) {
    res.json({
      message: 'Invalid header'
    })
    res.status(404)
    return
  }

  // get username password from headers
  const [, auth] = authorization.split(' ')
  const [, token] = auth.split(':')

  try {
    // auth user, if not found send back 403 err
    const decoded = verifyToken(token)
    if (!decoded) {
      res.status(403)
      res.json({
        message: 'Invalid access'
      })
      return
    }

    const user = await User.findById(decoded.id).exec()

    if (!user) {
      res.status(403)
      res.json({
        message: 'Invalid access'
      })
      return
    }

    const accessToken = createToken({
      id: user._id
    })

    res.json(accessToken)
  } catch (error) {
    console.log('err on get_role: ', error)
  }
};
