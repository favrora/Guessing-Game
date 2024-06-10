import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { default as socket } from "./ws";
import '../assets/styles/Chat.css';

interface ChatMessage {
  nickname: string;
  msg: string;
}

function Chat() {
  const [nickname, setNickname] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [usersOnline, setUsersOnline] = useState<string[]>([]);

  useEffect(() => {
    socket.on("chat message", ({ nickname, msg }: ChatMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, { nickname, msg }]);
    });

    socket.on("connect", () => {
      socket.emit("new-user");
    });

    socket.on("users-on", (list: string[]) => {
      setUsersOnline(list);
    });

    socket.on("user-data", (nick: string[]) => {
      if (!nickname) setNickname(nick[0]);
    });

    socket.on("user-disconnected", (user: string) => {
      if (user !== null) {
        setNotifications((prevNotifications) => [...prevNotifications, `${user} left the chat 👋🏻`]);
      }
    });

    let objDiv = document.getElementById("msg");
    if (objDiv) objDiv.scrollTop = objDiv.scrollHeight;

    return () => {
      socket.off();
    };
  }, [nickname]);

  const submitMsg = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (msg === "") {
      toast("Enter a message.", {
        duration: 4000,
        style: {},
        className: "",
        icon: "⚠️",
        role: "status",
        ariaLive: "polite",
      });
    } else {
      socket.emit("chat message", { nickname, msg });
      setChatMessages((prevMessages) => [...prevMessages, { nickname, msg }]);
      setMsg("");
    }
  };

  return (
    <div className="col-12 col-md-6">
      <div className="card-title">
        💬 Chat ({usersOnline !== null ? usersOnline.length : "0"})
      </div>

      <div className="card-box">
        <Toaster />

        <div className="messages-box" id="msg">
          {chatMessages.map((el, index) => (
            <div key={index} className="message">
              <div className="message-flex">
                <div className="nickname">{el.nickname}:</div>
                <div className="user-message">{el.msg}</div>
              </div>
            </div>
          ))}
          {notifications.map((notification, index) => (
            <p key={index} className="">{notification}</p>
          ))}
        </div>

        <form className="send-msg">
          <input
            type="text"
            className="pr-3 pr-md-3"
            name="message"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />

          <button className="btn btn-primary" onClick={submitMsg}>
            Start
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
