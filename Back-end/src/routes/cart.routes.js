import { Router } from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = Router()

// Todas las rutas del carrito requieren autenticación
router.use(verifyToken)

//router.get('/', getCart)
//router.post('/items', addToCart)
//router.put('/items/:id', updateCartItem)
//router.delete('/items/:id', removeFromCart)
//router.delete('/', clearCart)

export default router