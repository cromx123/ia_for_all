/* /components/Model.js*/
import React, {useState} from "react";
import './SignIn.css';

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword)
    return (
        <div className="login-container">
            <div className="model-box">
                <h1 className="model-title">Sign in to Visionary AI</h1>
                <div className="model-func-box">
                    <form className="login-form">
                        <label><input type="text" name="username" placeholder="Username or Email"required /></label>
                        <br />
                        <input type="password" name="password" placeholder="Password" required/>
                        <button type="submit" className="sign-in-button">Sign In</button>
                    </form>
                </div>
            </div>
            <div className="model-box2">
                <p>New to Visionary AI<a href="#">Create an Account</a></p>
            </div>
        </div>
    );
}

export default SignIn;