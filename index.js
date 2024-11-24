import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const api_url = "https://api.openweathermap.org/data/2.5/weather?";
const server_url = "https://telegram-bot-1-t1k9.onrender.com";


const getBotToken = async () => {
  try {
    const response = await axios.get(`${server_url}/bot`);
    return response.data[0].token;
  } catch (error) {
    console.log("getBotToken Error: ", error.message);
    return null;
  }
};

getBotToken().then((token) => {
  console.log("getBotToken: ", token);
  const bot = new TelegramBot(token, { polling: true });
  const message =
    "Welcome to Weather bot \nHere are the list of commands: \nTo subscribe to the bot - /subscribe\nTo unsubscribe from the bot - /unsubscribe";

  let subscribers = new Set();
  var lat, lon;

  const getSubscriber = async () => {
    try {
      const response = await axios.get(`${server_url}/users`);
      const users = response.data;

      for (const user of users) {
        const pair = [user.chatId, user.status];
        if (
          ![...subscribers].some(
            (existingPair) =>
              existingPair[0] === pair[0] && existingPair[1] === pair[1]
          )
        ) {
          subscribers.add(pair);
        }
      }
      console.log("Subscribers: ", subscribers);
    } catch (err) {
      console.error("Error fetching subscribers: ", err.message);
    }
  };
  getSubscriber();

  const sendWeatherUpdates = async () => {
    try {
      console.log("Fetching subscribers from the database...");

      // Fetch all subscribers from the backend
      const response = await axios.get(`${server_url}/users`);
      const subscribers = response.data;

      if (!subscribers || subscribers.length === 0) {
        console.log("No subscribers found.");
        return;
      }

      console.log("Subscribers fetched:", subscribers);

      for (const subscriber of subscribers) {
        if (subscriber.status) {
          // Assuming `status` is a Boolean
          console.log(
            `Fetching weather data for subscriber: ${subscriber.chatId}`
          );

          // Fetch weather data from OpenWeatherMap
          const weatherResponse = await axios.get(
            `${api_url}lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
          );

          const weather = weatherResponse.data.weather[0].description;
          const temp = weatherResponse.data.main.temp;

          console.log(`Weather data fetched: ${weather}, ${temp}°C`);

          // Send weather update to the subscriber
          bot.sendMessage(
            subscriber.chatId,
            `Today's weather at your location: ${weather}, ${temp}°C.`
          );

          console.log(
            `Weather update sent to subscriber: ${subscriber.chatId}`
          );
        }
      }
    } catch (error) {
      console.error("Error sending weather updates:", error.message);
    }
  };

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === "/start") {
      bot.sendMessage(chatId, message);
      console.log(chatId);
    }

    if (messageText === "/subscribe") {
      bot.sendMessage(
        chatId,
        "Subscribed to weather bot.\nClick on /location to share your location."
      );

      const firstName = msg.chat.first_name;

      const user = {
        name: firstName,
        chatId: chatId,
      };
      console.log(user);
      axios
        .post(`${server_url}/users`, user)
        .then((response) => {
          console.log(
            "Data sent successfully to localhost:3000",
            response.data
          );
        })
        .catch((error) => {
          console.error("Error sending data: ", error.message);
        });
    }

    if (messageText === "/unsubscribe") {
      subscribers.delete(chatId);

      axios
        .delete(`${server_url}/users/${chatId}`)
        .then((res) => {
          console.log("Data deleted successfully");
          bot.sendMessage(chatId, "Unsubscribed from Bot :(");
        })
        .catch((error) => {
          console.error("Error deleting user: " + error.message);
          bot.sendMessage(
            chatId,
            "Failed to unsubscribe. Please try again later."
          );
        });
    }

    if (messageText === "/location") {
      bot.sendMessage(
        chatId,
        "Please share your location to get weather updates:",
        {
          reply_markup: {
            keyboard: [[{ text: "Share Location", request_location: true }]],
            one_time_keyboard: true,
          },
        }
      );
    }
  });

  // Handle incoming location data
  bot.on("message", (msg) => {
    if (msg.location) {
      const { latitude, longitude } = msg.location;
      lat = latitude;
      lon = longitude;

      console.log(`Received location: Latitude ${lat}, Longitude ${lon}`);

      // Confirm location received
      bot.sendMessage(
        msg.chat.id,
        `Got your location! Latitude: ${lat}, Longitude: ${lon}. Weather updates will now use this location.`
      );

      // Trigger weather updates manually or via interval
      sendWeatherUpdates();
      // setInterval(sendWeatherUpdates, 60 * 1000);
    }
  });

  setInterval(sendWeatherUpdates, 60 * 1000);
});



app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
