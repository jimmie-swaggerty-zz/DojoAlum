import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Register = (props) => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});

    // CHECK THIS OUT!!!!
    //    using a single state object to hold all data!
    const [user, setUser] = useState({
        username: "",
        userType: [],
        email: "",
        password: "",
        confirmPassword: "",
    });

    // using a single function to update the state object
    //    we can use the input's name attribute as the key in to the object
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/api/user/register", user, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                setConfirmReg(true);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
                setErrs(err.response.data.errors);
            });
    };

    return (
        <div className="post">
            <div className="formheader">Register</div>
            <div className="postbody">
                {confirmReg ? (
                    <h4 style={{ color: "green" }}>{confirmReg}</h4>
                ) : null}
                <form onSubmit={register}>
                    <div>
                        <label>Username</label>
                        {errs.username ? (
                            <span className="error-text">
                                {errs.username.message}
                            </span>
                        ) : null}
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        {errs.email ? (
                            <span className="error-text">
                                {errs.email.message}
                            </span>
                        ) : null}
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        {errs.password ? (
                            <span className="error-text">
                                {errs.password.message}
                            </span>
                        ) : null}
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        {errs.confirmPassword ? (
                            <span className="error-text">
                                {errs.confirmPassword.message}
                            </span>
                        ) : null}
                        <input
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="center">
                        <button
                            type="submit"
                            className="btn btn-light me-2 btn-outline-primary"
                        >
                            Register Me
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
