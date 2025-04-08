import { useEffect, useState } from "react";
import JobZImage from "../../../../common/jobz-img";
import { useSearchParams } from "react-router-dom";
import { useChat } from "../../../../context/chat/chatContext";

function SectionCanChat() {
  const { messages, loadMessages, handleSendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const senderId = sessionStorage.getItem("user_id");
  console.log("user_id:", senderId);
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get("user");

  useEffect(() => {
    if (senderId && receiverId) {
      loadMessages(senderId, receiverId);
    }
  }, [senderId, receiverId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    handleSendMessage({
      sender_id: senderId,
      receiver_id: receiverId,
      message: newMessage,
    });
    setNewMessage("");
  };


  return (
    <div className="wt-dashboard-msg-box">
      <div className="single-msg-user-name-box">
        <div className="single-msg-short-discription">
          <h4 className="single-msg-user-name">Chat</h4>
          <p>Conversation with {receiverId}</p>
        </div>
        <a href="#" className="message-action">
          <i className="far fa-trash-alt" /> Delete Conversation
        </a>
      </div>
      <div
        id="msg-chat-wrap"
        className="single-user-msg-conversation scrollbar-macosx"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`single-user-comment-wrap ${
              msg.sender_id === senderId ? "sigle-user-reply" : ""
            }`}
          >
            <div className="row">
              <div
                className={`col-xl-9 col-lg-12 ${
                  msg.sender_id === senderId ? "justify-content-end" : ""
                }`}
              >
                <div className="single-user-comment-block clearfix">
                  <div className="single-user-com-pic">
                    <JobZImage
                      src={msg.sender.profile_image}
                      alt={msg.sender.name}
                    />
                  </div>
                  <div className="single-user-com-text">{msg.message}</div>
                  <div className="single-user-msg-time">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="single-msg-reply-comment">
        <div className="input-group">
          <textarea
            className="form-control"
            placeholder="Type a message here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn" type="button" onClick={sendMessage}>
            <i className="fa fa-paper-plane" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default SectionCanChat;
