import React, { useState } from "react";
import { auth, signInAnonymously } from "../firebaseConfig";

function JoinChat({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleJoin = () => {
    if (!username) {
      alert("Username cannot be empty");
      return;
    }
    signInAnonymously(auth).then(() => {
      onLogin(username);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Join Chat Room</h1>
      <div className="w-full max-w-xs flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter your name"
          className="bg-gray-700 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleJoin}
          className="bg-green-500 hover:bg-green-600 p-3 rounded text-white font-semibold"
        >
          Join
        </button>
      </div>

      {/* Privacy Notice Message */}
      <div className="text-center text-sm max-w-72 text-White mt-8">
        <p>
          This is a <strong>full private message</strong> and will be deleted every 24 hours.
        </p>
        <br/>
        <p className="bg-red-800 p-2 rounded-2xl font-bold">Developed by Deep</p>
        <p>Version: 01 beta</p>
      </div>
    </div>
  );
}

export default JoinChat;