import { createContext, useContext, useEffect, useState } from "react";
import {
  sendMessage,
  getMessages,
  getChatUsers,
  getMessagesOfReceiver,
  updateMessage,
  deleteMessage,
  subscribeToMessages,
  markAsRead,
} from "../chat/chatApi";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load messages between two users
  const loadMessages = async (senderId, receiverId) => {
    setLoading(true);
    try {
      const fetchedMessages = await getMessages(senderId, receiverId);
      setMessages(fetchedMessages);
     
    } catch (error) {
      console.error("Error loading messages:", error);
    }
    setLoading(false);
  };

  const loadChatUsers = async (userId) => {
    setLoading(true);
    try {
      const fetchedChatUsers = await getChatUsers(userId);
      setMessages(fetchedChatUsers);
     
    } catch (error) {
      console.error("Error loading messages:", error);
    }
    setLoading(false);
  };

  const processGetMessagesOfReceiver = async (id) => {
    try {
      const responseOnGetMessages = await getMessagesOfReceiver(id);
      console.log(responseOnGetMessages);
      setUnreadCount(responseOnGetMessages.delivered_count);
      setMessages(responseOnGetMessages.messages);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const processMarkAsRead = async (id, status) => {
    if (status == "delivered") {
      const responseOnMarkRead = await markAsRead(id);
      console.log(responseOnMarkRead);
      if (responseOnMarkRead.success) {
        setUnreadCount((prev) => prev - 1);
      }
    }
  };

  // Send a new message
  const handleSendMessage = async (data) => {
    try {
      const newMessage = await sendMessage(data);
      setMessages((prev) => [...prev, newMessage.chat]); // Update UI immediately
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Update a message
  const handleUpdateMessage = async (messageId, data) => {
    try {
      const updatedMessage = await updateMessage(messageId, data);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? updatedMessage.chat : msg))
      );
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  // Delete a message
  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Subscribe to real-time messages with Pusher
  useEffect(() => {
    const unsubscribe = subscribeToMessages((newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      unsubscribe(); // Cleanup
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        loadMessages,
        handleSendMessage,
        handleUpdateMessage,
        handleDeleteMessage,
        loadChatUsers,
        processGetMessagesOfReceiver,
        unreadCount,
        setUnreadCount,
        processMarkAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
