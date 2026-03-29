import swaggerAutogen from "swagger-autogen";


const doc = {
    info: {
        version: "v0.0.1",
        title: "Dokumentasi API Chat App",
        description: "ini adalah dokumenati rest API untuk backend dari aplikasi Chat App Realtime"
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Local Server"
        },
        {
            url: "https://backend-chat-app-frhn.vercel.app/api",
            description: "Deploy Server"
        }
    ],
    components: {
        securitySchemes:{
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },
        schemas: {
            RegisterRequest: {
                fullName: "farhan",
                userName: "aan",
                email: "farhan@gmail.com",
                password: "psswrd",
                confirmPassword: "psswrd"
            },
            Activation: {
                code: "123"
            },
            LoginRequest: {
                identifier: "email/username",
                password: "psswrd"
            },
            MessageRequest: {
                targetId: ":id",
                text: ""
            }
        }
    }
}


const outputFile = "./swagger-output.json";
const routes = ['../routes/api.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);