import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
    {
        senderid : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true
        },
        receiverid : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true
        },
        text : {
            type : String,
        },
        image : {
            type : String,
        },
        reactions : {
            type: Map, 
            of: String 
        }
    },
    {
        timestamps : true
    }
)

const Message = mongoose.model("Message",msgSchema)

export default Message