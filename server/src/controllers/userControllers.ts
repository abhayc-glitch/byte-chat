import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import User from "../models/user"


export const signin = async(req : any, res: any) => {
    const { email, password } = req.body;

    try {
        const existingUser = User.findOne({ email })
        // Check for existing user
        if(!existingUser) {return res.status(404).json({message: "User not found"})}
        
        // Invalid password case
        // Compare the hashed password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) {return res.status(400).json({message: "Invalid password"})}

        // STORE SECRET SOMEWHERE ELSE
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn : "1h"})

        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message:"Something went wrong, ", error})
        console.log(error)
    }

}

export const signup = async(req : any, res: any) => {

    const { username, email, password, confirmPassword } = req.body;

    try {
        const existingUser = User.findOne({email})
        if(existingUser) {return res.status(400).json({message: "User already exists, please sign in"})}
        
        if(password !== confirmPassword){return res.status(400).json({message: "Passwords don't match'"})}
        // 12 = salt rounds (difficulty of the hashing of the password)
        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({email, password : hashedPassword, username})

        const token = jwt.sign({ email: result.email, id: result._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn : "1h"})

         res.status(200).json({result, token})
    } catch (error) {
        console.log(error)
    }
    
}