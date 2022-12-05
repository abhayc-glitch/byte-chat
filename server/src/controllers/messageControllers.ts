const Message = require("../models/message");
const User = require("../models/user");
const Chat = require("../models/chat");

export const sendMessage = async(req : any, res: any) => {
    // Get content and chatId from req.body
    // Check for error -> if content and chatId are invalid
    // create new message object -> variable

    // query DB with try catch block 
    // Mongoose has a more powerful alternative called populate(), which lets you reference documents in other collections.

}

export const fetchMessage = async(req : any, res: any) => {

}



