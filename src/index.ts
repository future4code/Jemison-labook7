// import { app } from "./app";
import { friendshipRouter } from "./routes/friendshipRouter";
import { postRouter } from "./routes/postRouter";
import { userRouter } from "./routes/userRouter";

import cors from "cors";
import express from "express";
import { AddressInfo } from "net";
import knex from 'knex'
import dotenv from 'dotenv'



export const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

export class BaseDatabase{
    protected static connection = knex({
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            port: 3306,
            multipleStatements: true
        }
    })
    
}

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    } else {
        console.log("Failure upon starting server");
    }
})

app.use("/user",userRouter)
app.use("/post", postRouter)
app.use("/friendship", friendshipRouter)
