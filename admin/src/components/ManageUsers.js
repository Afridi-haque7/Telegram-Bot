import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://telegram-bot-1-t1k9.onrender.com/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users", err.message);
      });
  }, []);

  const changeStatus = async (chatId, status) => {
    const res = await axios.put(
      `https://telegram-bot-1-t1k9.onrender.com/users/${chatId}`,
      {
        status: status,
      }
    );
    console.log(res);
    const currentStatus = status ? "Active" : "Blocked";
    window.alert(`User ${currentStatus}`);

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.chatId === chatId) {
          return { ...user, status: status };
        }
        return user;
      })
    );
  };

  const deleteUser = async (chatId) => {
    const res = await axios.delete(
      `https://telegram-bot-1-t1k9.onrender.com/users/${chatId}`
    );
    console.log(res);
    window.alert("User deleted successfully");
    setUsers((prevUsers) => prevUsers.filter((user) => user.chatId !== chatId));
  };

  return (
    <div className="width-screen p-10 mr-10">
      <p className="font-semibold text-lg mb-5">Manage Subscribers</p>
      {users.length > 0 ? (
        users.map((user, index) => (
          <div
            key={user.chatId}
            className="border border-amber-200 px-10 py-5 my-3 rounded-lg shadow-md shadow-amber-200"
          >
            <div className="flex gap-5">
              <p className="font-semibold">Name: {user.name}</p>
              <p>Status: {user.status ? "Active" : "Inactive"}</p>
            </div>
            <div className="flex justify-evenly mt-5">
              <button
                onClick={() => changeStatus(user.chatId, !user.status)}
                className="border px-4 py-1 rounded-lg font-semibold bg-gray-600 text-white hover:bg-white hover:text-gray-600 hover:border-gray-700"
              >
                {user.status ? "Block" : "Activate"}
              </button>
              <button
                onClick={() => deleteUser(user.chatId)}
                className="border px-4 py-1 rounded-lg font-semibold bg-red-500 text-white hover:text-red-500 hover:bg-white hover:border-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p className="text-xl font-semibold">No user detected</p>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
