import { IUser } from '../interfaces/usersInterface'
import jwt from 'jsonwebtoken'
import { UsersService } from './usersService'
import { IApiResponse } from '../interfaces/response'
import { NextFunction } from 'express'

const keyToken = process.env.KEY_TOKEN ?? 'esteKey01'
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthService {
  /**
   * @description
   * @param email
   * @param password
   */
  export const authenticate = async (email: string, password: string): Promise<IApiResponse<{
    user: IUser
    token: string
  } | null>> => {
    try {
      const user: IApiResponse<IUser | null> = await UsersService.validateUser(email, password)
      if ((user?.data) != null) {
        const { id, name } = user.data
        const exp = Math.floor(Date.now() / 1000) + (60 * 60) // One hour
        const token = jwt.sign({ id, name, email, exp }, keyToken)
        return {
          success: true,
          statusCode: 200,
          data: { user: user.data, token },
          message: 'Authenticate user'
        }
      }
      return {
        success: false,
        statusCode: user.statusCode,
        data: null,
        message: user.message
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  /**
   * Middleware to validate token
   * @param req
   * @param res
   * @param next
   */
  export const validateTokenMiddleware = (req: any, res: any, next: NextFunction): void => {
    const invalid = { message: 'Token invalid', statusCode: 401 }
    const token: string = req.headers.authorization ? req.headers.authorization?.replace('Bearer ', '') : ''

    if (!token) {
      return res.status(401).json(invalid)
    }

    try {
      const decoded = jwt.verify(token, keyToken)
      if (decoded) {
        req.user = decoded
      }
      next()
    } catch (error) {
      return res.status(401).json(invalid)
    }
  }
}
