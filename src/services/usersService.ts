import { pool } from '../database/connection'
import { IApiResponse } from '../interfaces/response'
import { IUser } from '../interfaces/usersInterface'
import { BcryptService } from './bcryptService'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UsersService {
  /**
   * @description Get all users
   */
  export const getUsers = async (): Promise<IApiResponse<IUser[]>> => {
    const { rows } = await pool.query('select * from users')
    if (rows.length === 0) {
      return {
        success: false,
        statusCode: 200,
        data: [],
        message: 'Not users'
      }
    }
    for (const user of rows) {
      delete user.password
    }
    return {
      success: true,
      statusCode: 200,
      data: rows,
      message: 'Get Users Success'
    }
  }

  /**
   * @description Get user by id
   * @param id
   */
  export const getUser = async (id: number): Promise<IApiResponse<IUser | null>> => {
    const { rows } = await pool.query('select * from users where id = $1', [id])
    if (rows.length === 0) {
      return {
        success: false,
        statusCode: 404,
        data: null,
        message: 'User not found'
      }
    }
    const user = rows[0]
    delete user.password
    return {
      success: true,
      statusCode: 200,
      data: user,
      message: 'Get User Success'
    }
  }

  /**
   * @description Create user
   * @param user
   */
  export const createUser = async (user: IUser): Promise<IApiResponse<IUser | null>> => {
    if (!user || !user.name || !user.email || !user.password) {
      return {
        success: false,
        statusCode: 400,
        data: null,
        message: 'Missing data'
      }
    }
    const { name, email, password } = user
    const validUser = await pool.query('select * from users where email = $1', [email])
    if (validUser.rows.length > 0) {
      return {
        success: false,
        statusCode: 400,
        data: null,
        message: 'User already exists'
      }
    }
    const cryptPassword = await BcryptService.cryptPassword(password)
    const { rows } = await pool.query(
      'insert into users (name, email, password) values ($1, $2, $3) returning *',
      [name, email, cryptPassword]
    )
    return {
      success: true,
      statusCode: 201,
      data: rows[0],
      message: 'User Created Success'
    }
  }
  /**
   * @description Update user
   * @param id
   * @param user
   */
  export const updateUser = async (id: number, user: IUser): Promise<IApiResponse<IUser | null>> => {
    const { name, email } = user
    const validUser = await pool.query('select * from users where email = $1', [email])
    if (validUser.rows.length > 0 && id !== validUser.rows[0].id) {
      return {
        success: false,
        statusCode: 400,
        data: null,
        message: 'User email already exists'
      }
    }
    const { rows } = await pool.query(
      'update users set name = $1, email = $2 where id = $3 returning *',
      [name, email, id]
    )
    if (rows.length === 0) {
      return {
        success: false,
        statusCode: 404,
        data: null,
        message: 'User not found'
      }
    }
    return {
      success: true,
      statusCode: 200,
      data: rows[0],
      message: 'User Updated Success'
    }
  }

  /**
   * @description Delete user
   * @param id
   */
  export const deleteUser = async (id: number): Promise<IApiResponse<IUser | null>> => {
    const { rows } = await pool.query('delete from users where id = $1 returning *', [id])
    if (rows.length === 0) {
      return {
        success: false,
        statusCode: 404,
        data: null,
        message: 'User not found'
      }
    }
    return {
      success: true,
      statusCode: 200,
      data: rows[0],
      message: 'User Deleted Success'
    }
  }
  /**
   * @description Validate user by email and password
   * @param email
   * @param password
   */
  export const validateUser = async (email: string, password: string): Promise<IApiResponse<IUser | null>> => {
    const { rows } = await pool.query('select * from users where email = $1', [email])
    if (rows.length === 0) {
      return {
        success: false,
        statusCode: 404,
        data: null,
        message: 'User email is incorrect'
      }
    }
    const validPassword = await BcryptService.comparePassword(password, rows[0].password)
    delete rows[0].password
    return {
      success: validPassword,
      statusCode: validPassword ? 200 : 404,
      data: validPassword ? rows[0] : null,
      message: validPassword ? 'User Auth Success' : 'User password is incorrect'
    }
  }
}
