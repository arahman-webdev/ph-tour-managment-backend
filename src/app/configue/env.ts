
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
    SUPER_ADMIN_PASSWORD: string,
    GOOGLE_CLIENT_ID: string,
    GOOGLE_CLIENT_SECRET: string,
    GOOGLE_CALLBACK_URL: string,
    EXPRESS_SESSION_SECRET: string,
    FRONTEND_URL: string,
    SSL: {
        SSL_STORE_ID: string,
        SSL_STORE_PASSWORD: string,
        SSL_PAYMENT_URL: string,
        SSL_VERIFY_URL: string,
        SSL_SUCCESS_BACKEND_URL: string
        SSL_FAIL_BACKEND_URL: string
        SSL_CANCEL_BACKEND_URL: string
        SSL_SUCCESS_FRONTEND_URL: string
        SSL_FAIL_FRONTEND_URL: string
        SSL_CANCEL_FRONTEND_URL: string
    }

}




const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV", "BCRYPT_SALT_ROUNDS", "JWT_ACCESS_SECRET", "JWT_EXPIRATION", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRATION", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_CALLBACK_URL", "EXPRESS_SESSION_SECRET", "FRONTEND_URL", "SSL_STORE_ID", "SSL_STORE_PASSWORD", "SSL_PAYMENT_URL", "SSL_VERIFY_URL", "SSL_SUCCESS_BACKEND_URL", "SSL_FAIL_BACKEND_URL", "SSL_CANCEL_BACKEND_URL", "SSL_SUCCESS_FRONTEND_URL","SSL_FAIL_FRONTEND_URL", "SSL_CANCEL_FRONTEND_URL"];


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
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        SSL: {
            SSL_STORE_ID: process.env.SSL_STORE_ID as string,
            SSL_STORE_PASSWORD: process.env.SSL_STORE_PASSWORD as string,
            SSL_PAYMENT_URL: process.env.SSL_PAYMENT_URL as string,
            SSL_VERIFY_URL: process.env.SSL_VERIFY_URL as string,
            SSL_SUCCESS_BACKEND_URL:process.env.SSL_SUCCESS_BACKEND_URL as string,
            SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL as string,
            SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL as string,
            SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL as string,
            SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
            SSL_CANCEL_FRONTEND_URL: process.env.SL_CANCEL_FRONTEND_URL as string
        }

    }
}

export const envVars = loadEnvVariables()