import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { updateStatus } = props;

    const login = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/user/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res.cookie);
                console.log(res);
                console.log(res.data, "is res data!");
                updateStatus("logged-in");
                navigate("/home");
            })
            .catch((err) => {
                console.log(err.response);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div className="logincomp post">
            <div className="formheader">Login</div>
            <div className="postbody">
                <p className="error-text">{errorMessage ? errorMessage : ""}</p>
                <form onSubmit={login}>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="center">
                        <button
                            type="submit"
                            className="btn btn-light me-2 btn-outline-primary"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
