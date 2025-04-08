import { REACT_BASE_URL } from "../../../globals/constants";
import axios from "../../../utils/axios.config";
import pusher from "../../../utils/pusher"; // Import Pusher instance

// Subscribe to chat channel
export const subscribeToMessages = (callback) => {
  const channel = pusher.subscribe("my-channel");

  channel.bind("my-message", (data) => {
    callback(data.message);
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  };
};

// Send a new message
export const sendMessage = async (data) => {
  try {
    const response = await axios.post(`${REACT_BASE_URL}chat`, data);
    return response.data;
  } catch (err) {
    console.error("Error sending message:", err);
    throw err;
  }
};

export const getChatUsers = async (userId) => {
    try {
      const response = await axios.get(`${REACT_BASE_URL}chat-users/${userId}`);
      return response.data;
    } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  };
// Fetch messages between two users
export const getMessages = async (senderId, receiverId) => {
  try {
    const response = await axios.get(`${REACT_BASE_URL}chat/${senderId}/${receiverId}`);
    return response.data.messages;
  } catch (err) {
    console.error("Error fetching messages:", err);
    throw err;
  }
};

// Update a message
export const updateMessage = async (messageId, data) => {
  try {
    const response = await axios.put(`${REACT_BASE_URL}chat/${messageId}`, data);
    return response.data;
  } catch (err) {
    console.error("Error updating message:", err);
    throw err;
  }
};

// Delete a message
export const deleteMessage = async (messageId) => {
  try {
    const response = await axios.delete(`${REACT_BASE_URL}chat/${messageId}`);
    return response.data;
  } catch (err) {
    console.error("Error deleting message:", err);
    throw err;
  }
};
