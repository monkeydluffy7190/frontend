import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";

const LoginForm = ({ onLogin, loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Perform validation if needed

    // Call the onLogin prop with the entered username and password
    onLogin(username, password);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-md shadow-md md:max-w-lg lg:max-w-xl">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <label className="block mb-4">
        <span className="text-gray-700">Username:</span>
        <input
          className="mt-1 p-2 block w-full border rounded-md"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Password:</span>
        <input
          className="mt-1 p-2 block w-full border rounded-md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <TailSpin color="#4F46E5" height={30} width={30} />
          </div>
        ) : (
          "Login"
        )}
      </button>
    </div>
  );
};

export default LoginForm;
