
import dotenv from "dotenv"

dotenv.config()


interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    BCRYPT_SALT_ROUNDS: string,
    JWT_ACCESS_SECRET: string,
    JWT_EXPIRATION: string,
    JWT_REFRESH_SECRET: string,
    JWT_REFRESH_EXPIRATION: string,
    SUPER_ADMIN_EMAIL: string,
    SUPER_ADMIN_PASSWORD: string
}


const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV", "BCRYPT_SALT_ROUNDS", "JWT_ACCESS_SECRET", "JWT_EXPIRATION", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRATION"];


    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variabl ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_EXPIRATION: process.env.JWT_EXPIRATION as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION as string,

    }
}


export const envVars = loadEnvVariables()

/**
 * 
 * JWT_EXPIRATION
JWT_SECRET
BCRYPT_SALT_ROUNDS
 */