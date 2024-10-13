import React, { useState } from "react";

// Page will either open by ValidCredentials or valid Email domain i.e. Gmail
const validCredentials = {
  email: "person@gmail.com",
  password: "mypass23",
};
const validEmailDomain = "@gmail.com";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (email === validCredentials.email &&
        password === validCredentials.password) ||
      email.endsWith(validEmailDomain)
    ) {
      onLogin(); // Set Login to true
      setError("");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-300">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-3 border border-gray-600 rounded-lg w-full transition duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-3 border border-gray-600 rounded-lg w-full transition duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-700 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg transition duration-200 hover:bg-blue-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
