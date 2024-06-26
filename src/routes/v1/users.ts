import express from 'express'
import {
  UsersController
} from '@controllers/usersController'
import {
  AuthService
} from '@services/authService'

const routerUsers = express.Router()
routerUsers.get('/users', AuthService.validateTokenMiddleware, UsersController.getUsers)
routerUsers.get('/users/:id', AuthService.validateTokenMiddleware, UsersController.getUser)
routerUsers.post('/users', AuthService.validateTokenMiddleware, UsersController.createUser)
routerUsers.put('/users/:id', AuthService.validateTokenMiddleware, UsersController.updateUser)
routerUsers.delete('/users/:id', AuthService.validateTokenMiddleware, UsersController.deleteUser)
export default routerUsers
