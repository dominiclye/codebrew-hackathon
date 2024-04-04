import React from 'react'

const SignUp = () => {
  return (
    <div>
    <h1>Sign Up</h1>
    <input type="text" className="username" placeholder="username" />
    <input type="text" className="email" placeholder='email'/>
    <input type="text" className="password" placeholder='password'/>
    <button>Sign Up</button>

</div>
  )
}

export default SignUp