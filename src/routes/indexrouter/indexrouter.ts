import express from 'express';
import usersV1 from '../v1/users'
import productsV1 from '../v1/products'
import authUser from '../public/auth'
import products from "../public/products";
import register from "../public/register";

const router = express.Router()
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.use('/api/v1', usersV1)
router.use('/api/v1', productsV1)


router.use('/auth', authUser)
router.use('/products', products)
router.use('/register', register)

export default router
