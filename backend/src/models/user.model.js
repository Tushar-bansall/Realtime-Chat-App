import mongoose from 'mongoose'

const userSchema= new mongoose.Schema(
    {
        
        fullName: {
            type: String,
            required : true
        },
        email: {
            type: String,
            required : true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
        },
        password: {
            type: String,
            required : true,
            unique: true,
            minlength: 6
        },
        profilePicture: {
            type: String,
            default : ""
        },
        profilePictureUpdatedAt : {
            type: Date,
            default: null
        }
        ,
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        bio: {
            type: String,
            default : ""
        }
    },
    {
        timestamps: true,
    }
)

const User =mongoose.model("User",userSchema)

export default User