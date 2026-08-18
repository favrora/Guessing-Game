import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import socket from "../services/ws";

// Define the shape of a chat message
interface ChatMessage {
  id: string;
  nickname: string;
  msg: string;
}

type IncomingChatMessage = Omit<ChatMessage, "id">;

let nextMessageId = 0;

const createMessage = ({ nickname, msg }: IncomingChatMessage): ChatMessage => ({
  id: `message-${nextMessageId++}`,
  nickname,
  msg,
});

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
    const message = { nickname: nickname || "You", msg: msg.trim() };
    socket.emit("chat message", message);
    setChatMessages((prevMessages) => [...prevMessages, createMessage(message)]);
    setMsg("");
  };

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesEndRef.current && messagesEndRef.current.scrollIntoView) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onMessage = (message: IncomingChatMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, createMessage(message)]);
    };
    const onUsersOnline = (list: string[]) => setUsersOnline(list);
    const onUserData = (nick: string) => setNickname((current) => current || nick);
    const onUserDisconnected = (user: string) => {
      if (user !== null) {
        setNotifications((prevNotifications) => [...prevNotifications, `${user} left the chat 👋🏻`]);
      }
    };

    socket.on("chat message", onMessage);
    socket.on("users-on", onUsersOnline);
    socket.on("user-data", onUserData);
    socket.on("user-disconnected", onUserDisconnected);

    return () => {
      socket.off("chat message", onMessage);
      socket.off("users-on", onUsersOnline);
      socket.off("user-data", onUserData);
      socket.off("user-disconnected", onUserDisconnected);
    };
  }, []);

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
