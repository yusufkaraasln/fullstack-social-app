import React from "react"
import "../login/auth.scss"
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"


function Register() {

    const username = React.useRef()
    const email = React.useRef()
    const password = React.useRef()
    const passwordAgain = React.useRef()
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password.current.value !== passwordAgain.current.value) {
            passwordAgain.current.setCustomValidity("Passwords not match.")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }

            try {

                await axios.post("/auth/register/",user)
                navigate("/login")
                console.log("başarılı");
                
            } catch (error) {
                    console.log(error);
            }



        }

        console.log(password, passwordAgain);
    }


    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-wrapper-left">

                    <span>Social Network</span>
                    <p>Connect the world on Social Network...</p>


                </div>
                <form
                    onSubmit={handleSubmit}
                    className="login-wrapper-right">
                    <input type="text"
                        ref={username}
                        required
                        placeholder="Username" />
                    <input type="text"
                        ref={email}
                        required
                        placeholder="Email" />
                    <input type="password"
                        required
                        ref={password}
                        placeholder="Password" />
                    <input type="password"
                        required
                        ref={passwordAgain}
                        placeholder="Password Again" />
                    <button type="submit">Sign Up</button>
                    <button className="btn">

                        <Link to="/login">

                        Login
                        </Link>

                    </button>
                </form>
            </div>
        </div>
    )



}

export default Register