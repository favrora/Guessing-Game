import { Toaster } from "react-hot-toast";
import { useChat } from "../../hooks/useChat";
import './Chat.css';

/**
 * Chat component for displaying and sending chat messages.
 */
const Chat = () => {
  const {
    msg,
    setMsg,
    chatMessages,
    notifications,
    usersOnline,
    messagesEndRef,
    submitMsg,
  } = useChat();

  return (
    <div className="col-12 col-md-6">
      <div className="card-title">
        💬 Chat ({usersOnline.length})
      </div>

      <div className="card-box">
        <Toaster />

        <div className="messages-box" id="msg" aria-live="polite">
          {chatMessages.map((message) => (
            <div key={message.id} className="message">
              <div className="message-flex">
                <div className="nickname">{message.nickname}:</div>
                <div className="user-message">{message.msg}</div>
              </div>
            </div>
          ))}
          {notifications.map((notification, index) => (
            <p key={index}>{notification}</p>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="send-msg" onSubmit={submitMsg}>
          <input
            type="text"
            className="pr-3 pr-md-3"
            name="message"
            aria-label="Chat message"
            placeholder="Send message"
            maxLength={300}
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
