import { UsersService } from '../services/usersService'
import { IApiResponse } from '../interfaces/response'
import { IUser } from '../interfaces/usersInterface'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UsersController {
  export const getUsers = async (_req: any, _res: any): Promise<void> => {
    const data: IApiResponse<IUser[]> = await UsersService.getUsers()
    return _res.status(data.statusCode).json(data)
  }
  export const getUser = async (_req: any, _res: any): Promise<void> => {
    const data = await UsersService.getUser(_req.params.id)
    return _res.status(data.statusCode).json(data)
  }

  export const createUser = async (_req: any, _res: any): Promise<void> => {
    const data = await UsersService.createUser(_req.body)
    return _res.status(data.statusCode).json(data)
  }
  export const updateUser = async (_req: any, _res: any): Promise<void> => {
    const data = await UsersService.updateUser(_req.params.id, _req.body)
    return _res.status(data.statusCode).json(data)
  }
  export const deleteUser = async (_req: any, _res: any): Promise<void> => {
    const data = await UsersService.deleteUser(_req.params.id)
    return _res.status(data.statusCode).json(data)
  }
}
