import cors from "cors";
import express from "express";

export const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
   console.log('Servidor rodando na porta 3003')
})
