import { useEffect, useState } from "react";
import JobZImage from "../../../../common/jobz-img";
import { useChat } from "../../../../context/chat/chatContext";
import { useSearchParams } from "react-router-dom";
function EmpMessages1Page() {
  const { messages, loadMessages, handleSendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const senderId = sessionStorage.getItem('user_id')
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get("user");
 
  useEffect(() => {
    loadMessages(senderId, receiverId);
  
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



  console.log("mes", messages)

  return (
    <>
      <div className="wt-admin-right-page-header clearfix">
        <h2>Messages</h2>
        <div className="breadcrumbs">
          <a href="#">Home</a>
          <a href="#">Dasboard</a>
          <span>Messages</span>
        </div>
      </div>
      <div className="wt-admin-dashboard-msg-2">
        {/*Left Msg section*/}
        <div className="wt-dashboard-msg-user-list">
          <div className="user-msg-list-btn-outer">
            <button className="user-msg-list-btn-close">Close</button>
            <button className="user-msg-list-btn-open">User Message</button>
          </div>
          {/* Search Section Start*/}
          <div className="wt-dashboard-msg-search">
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Search Messages"
                type="text"
              />
              <button className="btn" type="button">
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
          {/* Search Section End*/}
          {/* Search Section End*/}
          <div className="msg-find-list">
            <select className="wt-select-box bs-select-hidden">
              <option>Recent Chats</option>
              <option>Short by Time</option>
              <option>Short by Unread</option>
            </select>
          </div>
          {/* Search Section End*/}
          {/* user msg list start*/}
          <div
            id="msg-list-wrap"
            className="wt-dashboard-msg-search-list scrollbar-macosx"
          >
            <div className="wt-dashboard-msg-search-list-wrap">
              <a href="#" className="msg-user-info clearfix">
                <div className="msg-user-timing">2 hours ago</div>
                <div className="msg-user-info-pic">
                  <JobZImage src="images/user-avtar/pic1.jpg" alt="" />
                </div>
                <div className="msg-user-info-text">
                  <div className="msg-user-name">Rustin Duza</div>
                  <div className="msg-user-discription">
                    All created by our Global
                  </div>
                </div>
              </a>
            </div>
            <div className="wt-dashboard-msg-search-list-wrap">
              <a href="#" className="msg-user-info clearfix">
                <div className="msg-user-timing">4 hours ago</div>
                <div className="msg-user-info-pic">
                  <JobZImage src="images/user-avtar/pic2.jpg" alt="" />
                </div>
                <div className="msg-user-info-text">
                  <div className="msg-user-name">Peter Hawkins</div>
                  <div className="msg-user-discription">
                    All created by our Global
                  </div>
                </div>
              </a>
            </div>
            <div className="wt-dashboard-msg-search-list-wrap">
              <a href="#" className="msg-user-info clearfix">
                <div className="msg-user-timing">Fri</div>
                <div className="msg-user-info-pic">
                  <JobZImage src="images/user-avtar/pic3.jpg" alt="" />
                </div>
                <div className="msg-user-info-text">
                  <div className="msg-user-name">Ralph Johnson</div>
                  <div className="msg-user-discription">
                    All created by our Global
                  </div>
                </div>
              </a>
            </div>
            <div className="wt-dashboard-msg-search-list-wrap">
              <a href="#" className="msg-user-info clearfix">
                <div className="msg-user-timing">Thu</div>
                <div className="msg-user-info-pic">
                  <JobZImage src="images/user-avtar/pic4.jpg" alt="" />
                </div>
                <div className="msg-user-info-text">
                  <div className="msg-user-name">Randall Henderson</div>
                  <div className="msg-user-discription">
                    All created by our Global
                  </div>
                </div>
              </a>
            </div>
            <div className="wt-dashboard-msg-search-list-wrap">
              <a href="#" className="msg-user-info clearfix">
                <div className="msg-user-timing">16/07/2019</div>
                <div className="msg-user-info-pic">
                  <JobZImage src="images/user-avtar/pic1.jpg" alt="" />
                </div>
                <div className="msg-user-info-text">
                  <div className="msg-user-name">Randall Warren</div>
                  <div className="msg-user-discription">
                    All created by our Global
                  </div>
                </div>
              </a>
            </div>
            <div className="wt-dashboard-msg-search-list-wrap">
              <a href="#" className="msg-user-info clearfix">
                <div className="msg-user-timing">16/07/2019</div>
                <div className="msg-user-info-pic">
                  <JobZImage src="images/user-avtar/pic2.jpg" alt="" />
                </div>
                <div className="msg-user-info-text">
                  <div className="msg-user-name">Christina Fischer </div>
                  <div className="msg-user-discription">
                    All created by our Global
                  </div>
                </div>
              </a>
            </div>
            <div className="wt-dashboard-msg-search-list-wrap">
              <a href="#" className="msg-user-info clearfix">
                <div className="msg-user-timing">16/07/2019</div>
                <div className="msg-user-info-pic">
                  <JobZImage src="images/user-avtar/pic3.jpg" alt="" />
                </div>
                <div className="msg-user-info-text">
                  <div className="msg-user-name">Wanda Willis</div>
                  <div className="msg-user-discription">
                    All created by our Global
                  </div>
                </div>
              </a>
            </div>
            <div className="wt-dashboard-msg-search-list-wrap">
              <a href="#" className="msg-user-info clearfix">
                <div className="msg-user-timing">16/07/2019</div>
                <div className="msg-user-info-pic">
                  <JobZImage src="images/user-avtar/pic4.jpg" alt="" />
                </div>
                <div className="msg-user-info-text">
                  <div className="msg-user-name">Peter Hawkins</div>
                  <div className="msg-user-discription">
                    All created by our Global
                  </div>
                </div>
              </a>
            </div>
            <div className="wt-dashboard-msg-search-list-wrap">
              <a href="#" className="msg-user-info clearfix">
                <div className="msg-user-timing">16/07/2019</div>
                <div className="msg-user-info-pic">
                  <JobZImage src="images/user-avtar/pic1.jpg" alt="" />
                </div>
                <div className="msg-user-info-text">
                  <div className="msg-user-name">Kathleen Moreno</div>
                  <div className="msg-user-discription">
                    All created by our Global
                  </div>
                </div>
              </a>
            </div>
            <div className="wt-dashboard-msg-search-list-wrap">
              <a href="#" className="msg-user-info clearfix">
                <div className="msg-user-timing">16/07/2019</div>
                <div className="msg-user-info-pic">
                  <JobZImage src="images/user-avtar/pic2.jpg" alt="" />
                </div>
                <div className="msg-user-info-text">
                  <div className="msg-user-name">Wanda Montgomery </div>
                  <div className="msg-user-discription">
                    All created by our Global
                  </div>
                </div>
              </a>
            </div>
          </div>
          {/* user msg list End*/}
        </div>
        {/*Right Msg section*/}
        <div className="wt-dashboard-msg-box">
          <div className="single-msg-user-name-box">
            <div className="single-msg-short-discription">
              <h4 className="single-msg-user-name">Rustin Duza</h4>
              Independent Web Designers and Developers.
            </div>
            <a href="#" className="message-action">
              <i className="far fa-trash-alt" /> Delete Conversation
            </a>
          </div>
          <div>
            {/* Chat Messages */}
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
                            src={
                              msg.sender_id === senderId
                                ? "images/user-avtar/pic1.jpg"
                                : "images/user-avtar/pic4.jpg"
                            }
                            alt="User Avatar"
                          />
                        </div>
                        <div className="single-user-com-text">
                          {msg.message}
                        </div>
                        <div className="single-user-msg-time">
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
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
        </div>
      </div>
    </>
  );
}
export default EmpMessages1Page;
