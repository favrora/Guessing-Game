import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import socket from "../services/ws";

// Define the shape of a chat message
interface ChatMessage {
  nickname: string;
  msg: string;
}

export const useChat = () => {
  const [nickname, setNickname] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [usersOnline, setUsersOnline] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Function to handle the submission of a new chat message
  const submitMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.trim() === "") {
      toast("Enter a message.", {
        duration: 4000,
        icon: "⚠️",
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      return;
    }
    socket.emit("chat message", { nickname, msg });
    setChatMessages((prevMessages) => [...prevMessages, { nickname, msg }]);
    setMsg("");
  };

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesEndRef.current && messagesEndRef.current.scrollIntoView) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Set up socket listeners on component mount
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

    return () => {
      socket.off();
    };
  }, [nickname]);

  // Scroll to bottom whenever chatMessages or notifications change
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, notifications]);

  return {
    nickname,
    setNickname,
    msg,
    setMsg,
    chatMessages,
    notifications,
    usersOnline,
    messagesEndRef,
    submitMsg,
  };
};
