import React from "react";
import Login from "../components/Login";
import RegisterUser from "../components/RegisterUser";

const LogReg = (props) => {
    const {updateStatus} = props
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-3 login">
                    <Login updateStatus={updateStatus} setUser={props.setUser}/>
                </div>
                <div className="col-3 login">
                    <RegisterUser />
                </div>
            </div>
        </div>
    );
};

export default LogReg;