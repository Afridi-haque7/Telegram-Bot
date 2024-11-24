import React, { useState } from "react";
import axios from "axios";

const authenticateToken = async (token) => {
  try {
    const res = await axios.get(`https://api.telegram.org/bot${token}/getMe`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Error:", err);
    return null; // Handle the error gracefully
  }
};

const updateToken = async (token) => {
  const res = await axios.put(`http://localhost:5000/bot/${token}`);
  console.log(res);
};
const Managebots = () => {
  const [telegramBotToken, setTelegramBotToken] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process the user's input here, e.g., send it to the server or perform some action
    console.log("User input:", telegramBotToken);
    const res = await authenticateToken(telegramBotToken);
    console.log(res);
    if (res) {
      if (res.ok === true) {
        console.log("Bot information:", res);
        await updateToken(telegramBotToken);
        console.log("Restart bot server for changes to be applied");
        window.alert(
          "Bot token updated. Please restart the bot server for changes to take effect."
        );
      }
    } else {
      console.log(
        "telegram bot token is invalid, generate a new token and try again"
      );
      window.alert(
        "Invalid telegram bot token. Please generate a new token and try again."
      );
      return "Enter valid API token.";
    }
  };
  return (
    <div className="p-10">
      <p className="font-semibold text-lg mb-5">Manage the Bot</p>
      <div>
        <form
          onSubmit={handleSubmit}
          className="border border-amber-200 width-50% p-10 flex justify-between shadow-xl shadow-amber-200"
        >
          <input
            type="text"
            id="token-input"
            label="Enter new token"
            placeholder="Enter new token"
            className="border border-gray-500 p-2 rounded-lg mr-5"
            value={telegramBotToken}
            onChange={(e) => setTelegramBotToken(e.target.value)}
          />
          <button
            type="submit"
            className="border border-green-600 rounded-xl px-5 bg-green-600 text-white font-semibold hover:text-green-600 hover:bg-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Managebots;
