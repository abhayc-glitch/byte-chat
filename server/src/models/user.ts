const mongoose = require("mongoose");
import { Schema } from 'mongoose';
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    id : {
        type: String,
        required: true,
        unique: true
    },
    image : {
        type: String,
        default: "https://avatars.dicebear.com/api/micah/:zzzzzz.svg"
    },
    friendRequests : {
        type: Array
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    },
    {
        timestamps: true,
    }
)
// Password encryption



export default mongoose.model("User", userSchema);
