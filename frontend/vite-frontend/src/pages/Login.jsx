import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    try {
      // Send POST request to your backend
      const response = await axios.post('http://localhost:5000/auth/login', loginData);

      // Check response status code or data as needed
      if (response.status === 200) {
        // Login successful
        console.log("Login successful:", response.data.message);
        // Here you might redirect the user or update the UI accordingly
      } else {
        // Handle any other status codes as needed
        console.log("Login failed:", response.data.message);
      }
    } catch (error) {
      // Handle errors (e.g., network error, server error, etc.)
      console.error("Login error:", error.response ? error.response.data.message : error.message);
    }
  }; // This closing brace ends the handleSubmit function

  // The return statement is correctly placed inside the LoginPage function
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input type="email" placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email} onChange={e => setEmail(e.target.value)}
                required />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input type="password" placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password} onChange={e => setPassword(e.target.value)}
                required />
            </div>
            <div className="flex items-baseline justify-between">
              <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;