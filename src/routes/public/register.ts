import express from 'express';
import { UsersController } from '@controllers/usersController';

const routerRegister = express.Router();

/**
 * @swagger
 * /register/user:
 *   post:
 *     summary: Registra un Usuario.
 *     tags:
 *       - register
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Registro de Usuario creado de manera exitosa.
 *        400:
 *         description: Error usuario existente.
 *       500:
 *         description: Error al registrar el usuario.
 */
routerRegister.post('/user', UsersController.createUser);

export default routerRegister;
