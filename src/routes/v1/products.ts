import express from 'express'
import {
  ProductsController
} from '@controllers/productsController'
import { AuthService } from '@services/authService';

const routerUsers = express.Router()

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Obtener listado de productos.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - products
 *     responses:
 *       200:
 *         description: Productos Obtenidos de manera exitosa.
 *       500:
 *         description: Error al obtener productos.
 *       401:
 *         description: Error de autenticación. (token vencido)
 */
routerUsers.get('/products', AuthService.validateTokenMiddleware, ProductsController.getProduct)
/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Obtener un solo producto por el id.
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: id del producto
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - products
 *     responses:
 *       200:
 *         description: Productos Obtenidos de manera exitosa.
 *       500:
 *         description: Error al obtener productos.
 *       401:
 *         description: Error de autenticación. (token vencido)
 */
routerUsers.get('/products/:id', AuthService.validateTokenMiddleware, ProductsController.getProduct)
/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Crea un producto.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - products
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Productos Obtenidos de manera exitosa.
 *       500:
 *         description: Error al obtener productos.
 *       401:
 *         description: Error de autenticación. (token vencido)
 */
routerUsers.post('/products', AuthService.validateTokenMiddleware, ProductsController.createProduct)
/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Actualizar un solo producto por el id.
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: id del producto
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - products
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Productos Obtenidos de manera exitosa.
 *       500:
 *         description: Error al obtener productos.
 *       401:
 *         description: Error de autenticación. (token vencido)
 */
routerUsers.put('/products/:id', AuthService.validateTokenMiddleware, ProductsController.updateProduct)
/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Eliminar un solo producto por el id.
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: id del producto
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - products
 *     responses:
 *       200:
 *         description: Productos Obtenidos de manera exitosa.
 *       500:
 *         description: Error al obtener productos.
 *       401:
 *         description: Error de autenticación. (token vencido)
 */
routerUsers.delete('/products/:id', AuthService.validateTokenMiddleware, ProductsController.deleteProduct)
export default routerUsers

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - stock
 *         - sku
 *         - barcode
 *         - grams
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: El nombre del producto
 *         price:
 *           type: number
 *           description: El precio del producto
 *         description:
 *           type: string
 *           description: La descripción del producto
 *         image:
 *           type: string
 *           format: base64
 *           description: La imagen del producto en formato base64
 *           example: "iVBORw0KGgoAAAANSUhEUgAA..."
 *         barcode:
 *           type: string
 *           description: El código de barras del producto
 *         grams:
 *           type: number
 *           description: Los gramos del producto
 *         stock:
 *           type: number
 *           description: El stock del producto
 *         sku:
 *           type: string
 *           description: El SKU del producto
 */