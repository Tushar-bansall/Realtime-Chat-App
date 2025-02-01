import {Server } from "socket.io"
import http from "http"
import express from "express"

import pkg from 'agora-access-token';
const { RtcTokenBuilder, RtcRole } = pkg;

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors : {
        origin : ["http://localhost:5173"]
    }
})

//online users
const userSocketMap = {} //{userId : socketId}

function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

io.on("connection",(socket) => {

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id

    //used to send events to all the connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",() => {
      delete userSocketMap[userId]
      io.emit("getOnlineUsers",Object.keys(userSocketMap))
  })
  ;
})

export {io, app, server,getReceiverSocketId}