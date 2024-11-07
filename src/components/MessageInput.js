import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSend = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="relative flex items-center p-3 bg-[#1e2a30]">
      {/* Emoji Picker Icon (Replaced with Emoji) */}
      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="text-gray-400 hover:text-gray-500 mr-2"
      >
        😊 {/* Emoji instead of SVG */}
      </button>

      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div className="absolute bottom-12 left-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <input
        type="text"
        className="flex-1 bg-[#333d47] text-white px-4 py-2 rounded-full outline-none"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleSend}
        className="ml-2 text-green-400 hover:text-green-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path d="M3 12l18-9-5.25 15.75L14.5 14l-4.5 2L3 12z" />
        </svg>
      </button>
    </div>
  );
}

export default MessageInput;
