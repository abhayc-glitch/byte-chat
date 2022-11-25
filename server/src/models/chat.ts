const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        chatName:{
            type: String,
            required: [true, "chatName is required"],
            maxlength: 200,
            // to remove whitespaces from strings
            trim: true,
        },
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        // Make a reference to the user schema in user.ts 
        // An array of the users in the chat
        users: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
)

const Chat = mongoose.model("Chat", chatSchema)
module.exports = Chat;