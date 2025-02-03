import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import cloudinary from '../lib/cloudinary.js'
import { createRequire } from "module"; // Import createRequire

const require = createRequire(import.meta.url); // Create a CommonJS require function
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
import {OAuth2Client} from "google-auth-library"
import { getReceiverSocketId,io } from "../lib/socket.js"

export const signup= async (req,res)=>{
    const {fullName,email,password} = req.body
    try {
        if(!fullName || !email || !password)
          {  return res.status(400).json({ message : "All fields are required"})}

        if(password.length < 6) {
            return res.status(400).json({ message : "Password must be at least 6 characters"})
        }

        const user = await User.findOne({email});

        if(user)
        {
            return res.status(400).json({ message: "User already exist with this email "})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password: hashPass
        })

        if(newUser)
        {
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePicture:newUser.profilePicture,
                createdAt:newUser.createdAt
            })
        }
        else{
            res.status(400).send({ message : "Invalid User Data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ messaage: "Internal Server Error"})
    }
}

export const login= async (req,res)=>{
    const {email,password} = req.body

    try {
        const user = await User.findOne({email})

        if(!user)
        {
            return res.status(400).json({ message : "Invalid credentials"})
        }

        const isCorrect = await bcrypt.compare(password,user.password)
        
        if(!isCorrect)
        {
            return res.status(400).json({ message : "Invalid credentials"})
        }

        generateToken(user._id,res)

        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture : user.profilePicture,
            createdAt:user.createdAt
        })

    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ messaage: "Internal Server Error"})
    }
}

export const logout= (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({ message : "Logged out Successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({ message: "Internal Server Error"})
    }
}

export const updateProfile= async (req,res) => {
    try {
        const {profilePicture} = req.body
        const id = req.user._id

        if(!profilePicture)
        {
            res.status(400).json({ message: "Profile picture required "})
        }

        const response = await cloudinary.uploader.upload(profilePicture)

        const updatedUser = await User.findByIdAndUpdate(id,{profilePicture : response.secure_url,
            profilePictureUpdatedAt: Date.now()
        }, {new:true})
        console.log("Updated:",Date.now());

        res.status(200).json(updatedUser)

    } catch (error) {
        console.log("Error in update Profile",error.message);
        res.status(500).json({ message: "Internal Server Error "})
    }
}



export const updateBio= async (req,res) => {
    try {
        const {bio} = req.body
        const id = req.user._id

        const updatedUser = await User.findByIdAndUpdate(id,{bio : bio}, {new:true})

        res.status(200).json(updatedUser)

    } catch (error) {
        console.log("Error in update Profile",error.message);
        res.status(500).json({ message: "Internal Server Error "})
    }
}

export const tokengenerate = async (req, res) => {
    const { channelName, uid,userToCallToId } = req.body;
    const socketId=getReceiverSocketId(userToCallToId)
  
    if (!channelName) {
      return res.status(400).json({ error: "Channel name is required" });
    }
  
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600; // Token valid for 1 hour
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  
    const token = RtcTokenBuilder.buildTokenWithUid(
      process.env.AGORA_APP_ID,
      process.env.AGORA_APP_CERTIFICATE,
      channelName,
      uid || 0, // Use 0 for dynamic UID assignment
      role,
      privilegeExpiredTs
    );

    io.to(socketId).emit("videoCall",{channelName,token})
  
    res.json({ token });
  }

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user)
        
    } catch (error) {
        console.log("Error in checkAuth controller",error.message)
        res.status(500).json({ message: "Internal Server Error "})
    }
}


export const googleLogin= async (req,res)=>{
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    const {id_token} = req.body
    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()

        const {sub,email,name} = payload

        const user = await User.findOne({email})

        if(user)
        {
            generateToken(user._id,res)
            return res.status(200).json({
                _id:user._id,
                fullName: user.fullName,
                email: user.email,
                profilePicture : user.profilePicture,
                createdAt:user.createdAt
            })
        }

        const newUser = new User({
            fullName:name,
            email,
            password: sub
        })

        if(newUser)
        {
            generateToken(newUser._id,res)
            await newUser.save()

            
            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture : newUser.profilePicture,
                createdAt:newUser.createdAt
            })
        }
        else{
            res.status(400).send({ message : "Invalid User Data" })
        }
    } catch (error) {
        console.log("Error in googleLogin controller", error.message)
        res.status(500).json({ messaage: "Internal Server Error"})
    }
}

