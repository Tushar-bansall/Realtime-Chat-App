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
          
        const receiverSocketId = getReceiverSocketId(updatedMessage.receiverid)
        const senderSocketId = getReceiverSocketId(updatedMessage.senderid)

        // Emit the reaction to the receiver
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newReaction", updatedMessage);
        }

        // Emit the reaction to the sender
        if (senderSocketId) {
            io.to(senderSocketId).emit("newReaction", updatedMessage);
        }


        res.status(201).json(updatedMessage)
    } catch (error) {
        console.log("Error in messageReact " , error.message)
        res.status(500).json({ message: "Internal Server Error"})
    }
}

export const getFriends = async (req,res) => {
        try {
            // Query the User collection for friends
            const user = await User.findById(req.params.id).populate('friends','fullName profilePicture bio');
            // Send back the users
            res.status(200).json(user.friends);
    
        } catch (error) {
            // Log the error and send a 500 server error response
            console.log("Error in getFriends:", error.message);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    

    export const addFriend = async (req,res) => {
        const friendId = req.params.id;
        const userId = req.user._id;
    
        try {
            const friend = await User.findById(friendId);
    
            if (!friend) {
                return res.status(404).json({ message: 'Friend not found' });
            }
            
            const updatedUser = await User.findById(userId);
            
            if (updatedUser.friends.includes(friendId)) {
                return res.status(400).json({ message: 'Friend already added' });
            }
            
            await User.findByIdAndUpdate(
                friendId,
                { $push: { friends: userId } },                  
            );

            const user = await User.findByIdAndUpdate(
                userId,
                { $push: { friends: friendId } },  
                { new: true }                       
            ).populate('friends','fullName profilePicture bio');

            
            if(!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            res.status(201).json(user.friends);
        
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server error' });
        }
    
    }
    
    export const removeFriend = async (req,res) => {
        const friendId = req.params.id;  
        const userId = req.user._id;     
    
        try {         

            await User.findByIdAndUpdate(
                friendId,
                { $pull: { friends: userId } }             
            );

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },  
                { new: true }                       
            ).populate('friends','fullName profilePicture bio');
            
            if (!updatedUser ) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.status(200).json(updatedUser.friends);
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server error' });
        }
    
    
    }