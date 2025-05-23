import express from 'express'
import cors from 'cors'
import { FRONTEND_URL } from '../config.js'
import authRouter from './routes/auth.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'
import userRouter from './routes/user.routes.js'

const app = express()

const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())

// Rutas base de la API
app.use('/api/v1/auth', authRouter)
//app.use('/api/v1/products', productRouter)
//app.use('/api/v1/cart', cartRouter)
//app.use('/api/v1/orders', orderRouter)
//app.use('/api/v1/users', userRouter)

// Ruta de salud para verificar que el servidor está funcionando
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Servidor funcionando correctamente' })
})

export default app