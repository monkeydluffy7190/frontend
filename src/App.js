import React, { useState, useEffect } from "react";
import SignUpForm from "./components/Signup";
import LoginForm from "./components/Login";
import { login, signup } from "./services/api";
import toast, { Toaster } from "react-hot-toast";
import { getErrorMessage } from "./functions";
import Table from "./components/Table";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [loading, setLoading] = useState(false);

  // Check localStorage for token and username on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("id");

    if (storedToken && storedUsername) {
      setLoggedInUser({userName:storedUsername,id:storedUserId});
    }
  }, []);

  const handleSignUp = async (username, password) => {
    try {
      if (!username || !password) {
        return toast.error("Please fill all details");
      }

      // Validate username (no spaces allowed)
      if (/\s/.test(username)) {
        return toast.error("Username should not contain spaces");
      }

      setLoading(true);

      const res = await signup(username, password);

      // Store token and username in localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", username);
      localStorage.setItem("id",res.id);

      toast.success(res.message);
      setShowLoginForm(true);
      setLoggedInUser({userName:username,id:res.id});
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      if (!username || !password) {
        return toast.error("Please fill all details");
      }

      // Validate username (no spaces allowed)
      if (/\s/.test(username)) {
        return toast.error("Username should not contain spaces");
      }

      setLoading(true);

      const res = await login(username, password);

      // Store token and username in localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", username);
      localStorage.setItem("id",res.id);

      toast.success(res.message);
      setShowLoginForm(true);
      setLoggedInUser({userName:username,id:res.id});
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    setLoggedInUser(null);
  };

  const toggleForm = () => {
    setShowLoginForm((prev) => !prev);
  };

  return (
    <div>
      <Toaster />
      <nav className="bg-gray-800 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              {loggedInUser ? `Welcome, ${loggedInUser.userName}!` : "My App"}
            </h1>
          </div>
          <div>
            {loggedInUser ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={toggleForm}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {showLoginForm ? "Switch to Sign Up" : "Switch to Login"}
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="mt-4 p-4">
        {loggedInUser ? (
          <>
            <Table setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}/>
          </>
        ) : showLoginForm ? (
          <LoginForm onLogin={handleLogin} loading={loading} />
        ) : (
          <SignUpForm onSignUp={handleSignUp} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default App;
