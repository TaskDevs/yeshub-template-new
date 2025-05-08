import React, { useState } from "react";
import styles from "./message.module.css";
import { staff } from "./message-data";
import {
  FiSearch,
  FiSend,
  FiImage,
  FiSmile,
  FiVideo,
  FiPhone,
} from "react-icons/fi";

const initialMessages = [
  { id: 1, sender: "them", text: "Hey there!" },
  { id: 2, sender: "me", text: "Hi, how are you?" },
  { id: 3, sender: "them", text: "Doing great, thanks!" },
];

const MessageDashboard = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedContact, setSelectedContact] = useState({});
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), sender: "me", text: input }]);
      setInput("");
    }
  };

  const handleChangeChat = (item) => {
    setSelectedId(item.id);
    setSelectedContact(item);
  };

  return (
    <div className="tw-css flex site-bg-gray w-full">
      <div
        className={`mt-20 bg-white rounded-md  ${styles.findClientContainer}`}
      >
        {/* Left sidebar with filters */}
        <div className={`${styles.sidebar}`}>
          <div className=" bg-white divide-gray-100">
            <div className="flex w-full max-w-md mx-auto h-16 justify-center items-center">
              <div className="relative w-[92%]">
                {/* Icon */}
                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FiSearch />
                </div>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Search conversation"
                  className="w-full pl-10 py-2 rounded-full border border-gray-300 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            {staff.map((item) => (
              <div
                key={item.id}
                onClick={() => handleChangeChat(item)}
                className={`flex w-full h-30 cursor-pointer ${
                  item.id == selectedId && "bg-gray-100"
                }`}
              >
                {/* Green Selection Bar */}
                <div
                  className={`w-1 h-28 ${
                    selectedId === item.id ? "bg-green-500" : "bg-transparent"
                  }`}
                ></div>

                {/* Avatar */}
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full"
                />

                {/* Name + Last Message */}
                <div className="flex flex-col py-4 pr-4 w-full items-start">
                  <div className="flex space-between w-full">
                    <span className="font-medium text-sm">{item.name}</span>
                    <span className="text-sm">{"Yesterday"}</span>
                  </div>
                  <span className="text-xs text-gray-500 truncate max-w-xs">
                    Hello world
                  </span>
                  <span className="bg-yellow-500 text-black text-xs rounded-full py-1 px-2">
                    {item.task}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Main content area */}
        <div className={`${styles.searchResults}`}>
          {/* Chat Window */}
          <div className="flex-1 flex flex-col bg-gray-50 w-full border-l">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between w-full">
              {/* Left Section: Avatar + Name */}
              <div className="flex items-center gap-3">
                <img
                  src={selectedContact?.avatar}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div>
                  <div className="font-semibold">{selectedContact?.name}</div>
                  <div className="text-sm text-gray-500">
                    Project: {selectedContact?.task}
                  </div>
                </div>
              </div>

              {/* Right Section: Icons */}
              <div className="flex items-center gap-4 text-gray-600">
                <button className="hover:text-green-500">
                  <FiVideo size={20} />
                </button>
                <button className="hover:text-green-500">
                  <FiPhone size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 bg-gray-100 w-full">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.sender === "me"
                      ? "ml-auto bg-green-200"
                      : "mr-auto bg-white"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t flex items-center gap-2 w-full">
              <input
                type="text"
                placeholder="Type a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded-md px-4 py-2 text-sm focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              {/* Emoji Icon */}
              <button className="text-gray-500 hover:text-green-600">
                <FiSmile size={20} />
              </button>

              {/* Upload Image Icon */}
              <label className="cursor-pointer text-gray-500 hover:text-green-600">
                <FiImage size={20} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={() => console.log("We are great")}
                />
              </label>

              {/* Send Button */}
              <button
                onClick={sendMessage}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDashboard;
