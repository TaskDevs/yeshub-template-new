import { createContext, useContext, useEffect, useState } from "react";
import { sendMessage, getMessages,getChatUsers , updateMessage, deleteMessage, subscribeToMessages } from '../chat/chatApi'

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load messages between two users
  const loadMessages = async (senderId, receiverId) => {
    setLoading(true);
    try {
      const fetchedMessages = await getMessages(senderId, receiverId);
      setMessages(fetchedMessages);
      console.log("mes", fetchedMessages)
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
      console.log("mes",fetchedChatUsers)
    } catch (error) {
      console.error("Error loading messages:", error);
    }
    setLoading(false);
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
