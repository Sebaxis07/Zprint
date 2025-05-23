import { Router } from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = Router()

// Todas las rutas de órdenes requieren autenticación
router.use(verifyToken)

//router.get('/', getUserOrders)
//router.get('/:id', getOrderById)
//router.post('/', createOrder)
//router.put('/:id/status', updateOrderStatus)

export default router