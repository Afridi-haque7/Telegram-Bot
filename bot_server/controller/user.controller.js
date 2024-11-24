import mongoose from "mongoose";
import User from "../model/user.model.js";

const getAllUsers = async(req, res) => {
    try {
        const result = await User.find();
        if (result.length === 0) {
          console.log("No Users found");
          return res.send({ status: 404, message: "No Users found" });
        }
        console.log("Fetched Users:", result);

        return res.status(200).send(result);
    } catch (error) {
        console.error('Error fetching users', error);
        return res.status(500).send({message: 'Error fetching users'})
        
    }
};

const registerUser = async(req, res) => {
    try {
      const { name, chatId } = req.body;
      if (!name || !chatId) {
        return res
          .status(400)
          .send({ message: "Name and chatId are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ chatId });
      if (existingUser) {
        return res.status(409).send({ message: "User already registered" });
      }
      // Register user
      const user = new User({ name, chatId, status: true });
      await user.save();

      console.log("User registered:", user);
      return res.status(201).send(user);
    } catch (error) {
        console.error("Error registering user:", error.message);
        return res.status(500).send({ message: "Error registering user" });
    }
};


const deleteUser = async (req,res) => {
    try {
      const { chatId } = req.params; // Extract the chatId from the request parameters

      // Find and delete the user by chatId
      const deletedUser = await User.findOneAndDelete({ chatId: chatId });

      if (!deletedUser) {
        return res.status(404).send({ message: "User not found" });
      }

      console.log(`User with chatId ${chatId} unsubscribed successfully`);
      return res
        .status(200)
        .send({ message: "User unsubscribed successfully" });
    } catch (error) {
      console.error("Error deleting user:", error.message);
      return res.status(500).send({ message: "Error deleting user" });
    }

};

const updateUser = async(req, res) => {
  const {chatId} = req.params;
  const {status} = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      {chatId}, 
      {status},
      {new:true}
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not updated" });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).send({ message: "Failed to update user status" });
  }
};

export { getAllUsers, registerUser, deleteUser, updateUser };