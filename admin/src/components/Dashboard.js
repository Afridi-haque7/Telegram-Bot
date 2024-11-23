import React, { useEffect, useState } from "react";
import LogoutButton from "./Logout";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user from localStorage
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
      console.log("User from local storage", userFromLocalStorage);
    }
  }, []);

  return (
    <div className="p-2">
      <div className="flex justify-center">
        <p className="text-2xl font-semibold">
          Weather Bot Admin Panel Dashboard
        </p>
      </div>
      <div className="flex justify-end">
        <LogoutButton />
      </div>
      <div className="flex justify-center text-lg">
        {user ? <p>Welcome, {user}</p> : <p>Welcome to Admin Panel</p>}
      </div>
    </div>
  );
};

export default Dashboard;
