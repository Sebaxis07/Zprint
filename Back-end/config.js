import dotenv from 'dotenv'
dotenv.config()

export const {
    PORT = 3000,
    JWT_SECRET,
    FRONTEND_URL
} = process.env