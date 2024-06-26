import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registerData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/register', registerData);

            if (response.status === 201) {
                console.log("Register successful:", response.data.message);
                navigate('/login');
            } else {
                console.log("Register failed:", response.data.message);
            }
        } catch (err) {
            console.log("Register error:", err.response ? err.response.data.message : err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">Register an account</h3>
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
    )
}

export default Register