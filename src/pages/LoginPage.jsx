import React, { useState } from "react";

const LoginPage = ({ onNavigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isIncorrect, setIsIncorrect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsIncorrect(false);

    if ("Notification" in window && Notification.permission !== "granted") {
      try {
        Notification.requestPermission().then(() => {});
      } catch (error) {}
    }

    setTimeout(() => {
      if (username !== "admin" && password !== "admin") {
        setIsIncorrect(true);
      } else {
        onNavigate("home");
      }
    }, 1000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
            autocorrect="off"
            autocapitalize="off"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
      {isIncorrect && (
        <div className="block text-sm font-medium mt-4 bg-red-700 py-2 px-4 text-stone-50 rounded-lg">
          Wrong credentials
        </div>
      )}
    </div>
  );
};

export default LoginPage;
