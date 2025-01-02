import express from 'express'
import { connectDB } from './lib/db.js';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {app,server} from "./lib/socket.js"
import path from 'path';

dotenv.config()
const corsOptions = {
  origin: 'http://localhost:5173',  // Frontend origin, make sure this is correct
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow credentials (cookies, headers)
};

const __dirname = path.resolve()

app.use(express.json())
app.use(cors(corsOptions));
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
  

const PORT = process.env.PORT;

if(process.env.NODE_ENV==="production")
{
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

server.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
    connectDB()
})
