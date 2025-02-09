import dotenv from "dotenv"

dotenv.config()

export const ENV_VARS={
    DB_NAME:process.env.DB_NAME,
    DB_USER:process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_HOST:process.env.DB_HOST,
    PORT:process.env.PORT || 5000,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV,
    TMDB_API_KEY:process.env.TMDB_API_KEY,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY
}