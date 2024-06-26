import express from 'express'
import { AuthController } from '@controllers/authController'

const routerAuth = express.Router()

/**
 * @swagger
 * /auth/user:
 *   post:
 *     summary: Autenticar un usuario.
 *     tags:
 *       - user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Productos Obtenidos de manera exitosa.
 *       500:
 *         description: Error al obtener productos.
 *       401:
 *         description: Error de autenticación. (token vencido)
 */
routerAuth.post('/user', AuthController.authUser)
export default routerAuth
/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *
 *       properties:
 *         email:
 *           type: string
 *           description: Correo de usuario.
 *         password:
 *           type: string
 *           description: Clave del usuario.
 */