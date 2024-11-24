import mongoose from "mongoose";
import Bot from './bot.model.js';

const getToken = async(req, res) => {
    try {
        const bots = await Bot.find();
        if(bots.length === 0){
            console.log("No bots found");
            
        }
        console.log(" Fetched bots", bots);
        return res.status(200).send(bots);
    } catch (error) {
        console.log("getToken error: ", error.message);
        return res.status(500).send(error.message);
    }
}

const updateToken = async(req, res) => {
    try {
        const {token} = req.params;
        const updatedBot = await Bot.findOneAndUpdate({}, {token: token});
        if(!updatedBot) {
            console.log("No bot found to update.");
            
        }
        console.log("Token updated successfully");
        return res.status(200).send(updatedBot);
    } catch (error) {
        console.log("Error updating token: " + error.message);
        
    }
}

export {getToken, updateToken};