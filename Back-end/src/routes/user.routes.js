import { Router } from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = Router()

// Todas las rutas de usuario requieren autenticación
router.use(verifyToken)

//router.get('/profile', getUserProfile)
//router.put('/profile', updateUserProfile)
//router.get('/addresses', getUserAddresses)
//router.post('/addresses', addUserAddress)
//router.put('/addresses/:id', updateUserAddress)
//router.delete('/addresses/:id', deleteUserAddress)

export default router