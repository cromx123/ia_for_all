import React, { useState } from "react";
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password }); // Aquí puedes conectar con tu backend.
  };

  return (
    <div className="container">
        <div className="login-container">
        <h1>Sign in to Visionary AI</h1>
        <form className="login-form" onSubmit={handleSubmit}>
            <label>Email or Username</label>
            <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <label>Password</label>
            <div className="password-container">
            <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <svg
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                >
                {showPassword ? (
                    <path d="M12 4.5C7 4.5 2.7 8 1 12c1.7 4 6 7.5 11 7.5s9.3-3.5 11-7.5c-1.7-4-6-7.5-11-7.5zm0 13c-3.1 0-5.7-2-7-5 1.3-3 3.9-5 7-5s5.7 2 7 5c-1.3 3-3.9 5-7 5zm0-9c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                    />
                ) : (
                    <path d="M12 4.5C7 4.5 2.7 8 1 12c1.7 4 6 7.5 11 7.5s9.3-3.5 11-7.5c-1.7-4-6-7.5-11-7.5z"
                    fill="black"
                    />
                )}
                </svg>
            </div>
            <button type="submit">Sign In</button>
        </form>
        <p>
            New to Visionary AI? <a href="/signup">Create an account</a>
        </p>
        </div>
    </div>
  );
}

export default SignIn;
