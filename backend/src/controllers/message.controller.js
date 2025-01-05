import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId,io } from "../lib/socket.js"

export const getUsers = async (req,res) => {
    try {
        const loggedinid = req.user._id
        const users = await User.find({_id : {$ne:loggedinid}}).select("-password")
        
        res.status(200).json(users)

    } catch (error) {
        console.log("Error in getUsers",error.message)
        res.status(500).json({ message: "Internal Server Error "})
    }
}

export const getMessages = async (req,res) => {
    try {
        const {id : receiverid} = req.params
        const senderId = req.user._id

        const messages = await Message.find({
            $or :[
                {senderid : senderId, receiverid : receiverid},
                {senderid : receiverid, receiverid : senderId }
            ]
        })
        
        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in getMessages",error.message)
        res.status(500).json({ message: "Internal Server Error "})
    }
}

export const sendMessage = async (req,res) => {
    
    try {
        const {text, image} = req.body
        const senderid = req.user._id
        const {id : receiverid} = req.params

        let imageURL
        if(image)
        {
            const response = await cloudinary.uploader.upload(image)
            imageURL = response.secure_url
        }
        
        const msg = new Message({
            senderid,
            receiverid,
            text,
            image : imageURL
        })
    
        await msg.save()

        //realtime functionality using socket.io
        const receiverSocketId = getReceiverSocketId(receiverid)
        if(receiverSocketId)
            io.to(receiverSocketId).emit("newMessage", msg)

        res.status(201).json(msg);

    } catch (error) {
        console.log("Error in sendMessage",error.message)
        res.status(500).json({ message: "Internal Server Error "})
    }
    
}

export const messageReact = async (req,res) => {
    try {
        const {message_id,reaction} = req.body
        const reactionbyusername = req.user.fullName
        const updatedMessage = await Message.findOneAndUpdate(
            { _id: message_id },
            { $set: { [`reactions.${reactionbyusername}`]: reaction } },
            { new: true } // This returns the updated document
          );
          
        res.status(201).json(updatedMessage)
    } catch (error) {
        console.log("Error in messageReact " , error.message)
        res.status(500).json({ message: "Internal Server Error"})
    }
}