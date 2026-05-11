import dotenv from 'dotenv';

dotenv.config();



export const DATABASE_URL: string = process.env.DATABASE_URL || ""
export const SECRET: string = process.env.SECRET || ""

export const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD_APP || ""
export const MY_EMAIL : string = process.env.MY_EMAIL || ""

export const CLIENT_HOST : string = process.env.CLIENT_HOST || ""

export const CLOUDINARY_CLOUD_NAME : string = process.env.CLOUDINARY_CLOUD_NAME || ""
export const CLOUDINARY_API_KEY : string = process.env.CLOUDINARY_API_KEY || ""
export const CLOUDINARY_API_SECRET : string = process.env.CLOUDINARY_API_SECRET || ""