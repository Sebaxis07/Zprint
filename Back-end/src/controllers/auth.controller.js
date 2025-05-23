import pkg from '@prisma/client'
const { PrismaClient } = pkg
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config.js'

const prisma = new PrismaClient()

export const login = async (req, res) => {
    try {

        // Verificar si req.body existe
        if (!req.body) {
            return res.status(400).json({
                message: 'Datos no proporcionados'
            });
        }
        
        const { email, password } = req.body

        // Verificar si el usuario existe
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            })
        }

        // Verificar la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password_hash)
        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            })
        }

        // Generar token JWT
        const token = jwt.sign(
            { 
                id: user.id_user,
                email: user.email,
                role: user.role 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({
            token,
            user: {
                id: user.id_user,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        console.error('Error en login:', error)
        res.status(500).json({
            message: 'Error al iniciar sesión'
        })
    }
}

export const register = async (req, res) => {
    try {
        // Verificar si req.body existe
        if (!req.body) {
            return res.status(400).json({
                message: 'Datos no proporcionados'
            });
        }

        const { name, last_name, email, password } = req.body;
        
        // Verificar que todos los campos requeridos estén presentes
        if (!name || !last_name || !email || !password) {
            return res.status(400).json({
                message: 'Todos los campos son requeridos'
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'El correo electrónico ya está registrado'
            });
        }

        // Hash de la contraseña
        const password_hash = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = await prisma.user.create({
            data: {
                name,
                last_name,
                email,
                password_hash,
            }
        });

        // Generar token JWT
        const token = jwt.sign(
            { 
                id: newUser.id_user,
                email: newUser.email,
                role: newUser.role
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(201).json({
            token,
            user: {
                id: newUser.id_user,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        })

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            message: 'Error al registrar usuario'
        });
    }
}