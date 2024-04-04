import React from 'react'

const Login = () => {
  return (
    <div>
        <h1>Login</h1>
        <input type="text" className="email" placeholder='email'/>
        <input type="text" className="password" placeholder='password'/>
        <button>Login</button>

    </div>
  )
}

export default Login