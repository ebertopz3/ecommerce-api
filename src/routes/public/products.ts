import { ProductsController } from "@controllers/productsController";
import express from "express";

const routerProducts = express.Router();
/**
 * @swagger
 * /api/products/all:
 *   get:
 *     summary: Obtener todos los productos sin el token.
 *     tags:
 *       - products
 *     responses:
 *       200:
 *         description: Productos Obtenidos de manera exitosa.
 *       500:
 *         description: Error al obtener productos.
 */
routerProducts.get("/all", ProductsController.getProducts);
/**
 * @swagger
 * /api/products/all/{page_size}/{page_number}:
 *   get:
 *     summary: Obtener todos los productos sin el token y paginados.
 *     tags:
 *       - products
 *     responses:
 *       200:
 *         description: Productos Obtenidos de manera exitosa.
 *       500:
 *         description: Error al obtener productos.
 */
routerProducts.get(
  '/all/:page_size/:page_number',
  ProductsController.getProducts
);
export default routerProducts;