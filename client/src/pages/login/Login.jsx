import React from "react"
import "./auth.scss"
import { loginCall } from "../../apiCall"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import {CircularProgress} from "@mui/material"
function Login() {

    const email = React.useRef()
    const password = React.useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)



    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)


        console.log(email.current.value);

    }

    console.log(user);
    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-wrapper-left">

                    <span>Social Network</span>
                    <p>Connect the world on Social Network...</p>


                </div>
                <form onSubmit={handleSubmit} className="login-wrapper-right">



                    <input type="text" ref={email} required placeholder="Email" />
                    <input type="Password" ref={password} required placeholder="Password" />
                    <button  disabled={isFetching} >{
                        isFetching ?

                            <CircularProgress color="inherit" size={"17px"}/>
                            : "Log In"

                    }</button>
                    <a href="#">Forgot Password?</a>
                    <button className="btn">Create a New Account</button>
                </form>
            </div>
        </div>
    )



}

export default Login