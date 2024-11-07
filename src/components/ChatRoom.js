import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import MessageInput from "./MessageInput";

function ChatRoom({ username, onLogout }) {
  const [messages, setMessages] = useState([]);
  const endOfMessagesRef = useRef(null); // Ref for the last message container

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("created"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Scroll to the bottom when the messages change
    endOfMessagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]); // Trigger this effect whenever messages change

  const sendMessage = async (message) => {
    await addDoc(collection(db, "messages"), {
      user: username,
      message,
      created: serverTimestamp(),
    });
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')] bg-cover bg-center text-white shadow-lg">
      
      {/* Header */}
      <div className="flex items-center p-4 bg-[#075E54]">
        <div className="w-10 h-10 rounded-full bg-gray-00 mr-3">
          <img
            src="https://png.pngtree.com/png-clipart/20231001/original/pngtree-yellow-cat-emoji-png-image_13026807.png"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold">{username || "Anonymous"}</h1>
          <p className="text-sm text-green-300">Online</p>
        </div>
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="ml-auto text-sm bg-gray-800 p-2 rounded-2xl text-gray-400 hover:text-red-600"
        >
          Logout
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-chat-pattern p-4 space-y-3">
        <ul className="space-y-2">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`flex ${msg.user === username ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`${
                  msg.user === username ? "bg-green-500 text-white" : "bg-gray-700 text-white"
                } max-w-xs p-2 rounded-lg`}
              >
                <div>{msg.message}</div>
                <div className="text-xs text-gray-300 mt-1 text-right">
                  {msg.created && new Date(msg.created.seconds * 1000).toLocaleTimeString()}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Scroll to the bottom marker */}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input */}
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
}

export default ChatRoom;

