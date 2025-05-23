import { PORT } from './config.js'
import app from './src/app.js'

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})