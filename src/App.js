import React, { useState, useEffect, Suspense } from "react";
import JoinChat from "./components/JoinChat";

const ChatRoom = React.lazy(() => import("./components/ChatRoom"));

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for the username on app load
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login
  const handleLogin = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
    localStorage.setItem("username", name); // Store username in localStorage
  };

  // Handle logout
  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
    localStorage.removeItem("username"); // Remove username from localStorage
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        // Wrap lazy-loaded component in Suspense for fallback loading
        <Suspense fallback={<div className="text-center text-white">Loading chat...</div>}>
          <ChatRoom username={username} onLogout={handleLogout} />
        </Suspense>
      ) : (
        <JoinChat onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
