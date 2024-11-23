import React, {useState} from 'react'
import axios from 'axios';


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
  const res = await axios.put(
    `https://botserver-production.up.railway.app/bot/${token}`
  );
  console.log(res);
};
const Managebots = () => {
  return (
    <div>
      
    </div>
  )
}

export default Managebots;
