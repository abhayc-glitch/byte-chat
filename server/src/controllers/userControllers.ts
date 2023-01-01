import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import User from "../models/user"

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
    res.status(200).json(user);

    const friends = await Promise.all(
      user.friends.map((id)=> User.findById(id)))

    const formattedFriends = friends.map(({id, username, location, image}) => {
      return {id, username, location, image}
    })

    res.status(200).json({formattedFriends})
  } catch (error) {
    
  }
  
}


export const addremoveFriend = async (req,res) => {
  try {
    const {id, friendID} = req.params;
    const user = await User.findById(id)
    const friend = await User.findById(friendID)

    if (user.friends.includes(friendID)) {
      // removing whenever id is equal to friendID so the same friend isnt added
      user.friends = user.friends.filter((id) => id !== friendID)
    } else {
      // Push -> adds friend Id to array of friends
      user.friends.push(friendID)
      // adding the users ID to the array of the FRIEND's id
      user.friends.push(id)
    }
    await user.save();
    await friend.save();

    // Formatting the friends again so that the frontend can use it
    const friends = await Promise.all(
      user.friends.map((id)=> User.findById(id)))

    const formattedFriends = friends.map(({id, username, location, image}) => {
      return {id, username, location, image}
    })

  } catch (error) {
    res.status(404).json({message:"Something went wrong, ", error})
  }
}


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

export const sendFriendRequest = async(req: any, res: any) => {
    const { friendName } = req.body;
    try {
        const existingUser = User.findOne({ friendName })
        if (existingUser) (0)

    } catch (error) {
        
    }

}

export const getFriendRequests = async(req : any, res: any) => {

}

// Private access method
export const allUsers = async (req: any, res: any) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const allUserData = await User.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    if (allUserData.length === 0) {
      res.status(200).json({
        message: "No user Exist",
      });
    }
    res.status(200).json({
      users: allUserData,
    });
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
};