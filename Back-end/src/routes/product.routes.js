import { Router } from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = Router()

// Rutas públicas
//router.get('/', getProducts)
//router.get('/:id', getProductById)
//router.get('/category/:categoryId', getProductsByCategory)

// Rutas protegidas
//router.post('/', verifyToken, createProduct)
//router.put('/:id', verifyToken, updateProduct)
//router.delete('/:id', verifyToken, deleteProduct)

export default router