import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const lUrl = "https://phpwebdevelopmentservices.com/project-react-backend/api/login";

const Login = () => {
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        email: '',
        password: ''
    })
    const [successMessage, setSuccessMessage] = useState('');
    const [failureMessage, setFailureMessage] = useState('');
    const [userData, setUserData] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setFailureMessage('');
        console.log(email, password);
        const emptyFieldErrors = {};
        if (!email) {
            emptyFieldErrors.email = "Email is required.";
        }
        if (!password) {
            emptyFieldErrors.password = "Password is required.";
        }
        const allErrors = {
            ...emptyFieldErrors
        };

        const regDetails = {
            "email": email,
            "password": password,
        }
        try {
            let res = await axios.post(lUrl, {
                params: regDetails
            })
            res = res.data;
            // console.log(res);
            if (res.error) {
                let errorType = res.error;
                errorType = Object.values(errorType)
                console.log(errorType)
                console.log(res.error)
                if (errorType[1] === "Warning!") {
                    allErrors.email = "The login credentials are invalid, please try again.";
                }
                else if(errorType[1] === "Invalid login credentials"){
                    allErrors.email = "Email or phone is not registred in this platform";
                }
                setError(allErrors);
            }
            else {
                console.log(res);
                const user = res.result.userdata;
                const logData = user.name;
                const ltk = res.result.token;
                sessionStorage.setItem("ltk",ltk);
                sessionStorage.setItem("logData",logData);
                setUserData(user);
                setSuccessMessage("Congratulations, You have successfully logged in.")
                setEmail('');
                setPassword('');
                setTimeout(()=>{
                    navigate("/editprofile")
                },1500)
            }
        } catch (error) {
            let errMessage = error.message;
            setFailureMessage(errMessage)
            console.log("error", error.message)
        }
    }
    return (
        <>
            <div class="wrapper">
                <Header></Header>
                <div class="search_main_section">
                    <div class="container">
                        <div class="row res_padd">
                            {
                                failureMessage && (
                                    <div className='fail_message'>
                                        <div class="alert alert-primary" role="alert">
                                            {failureMessage}
                                        </div>
                                    </div>
                                )
                            }
                            {successMessage && (<div className='success-msg'>
                                <div className="jumbotron">
                                    {userData && (<>
                                        <h1 className="display-4">Welcome back, {userData.name}</h1>
                                    </>)}
                                </div>
                            </div>)}
                            <div class="main-center-div">
                                <div class="top-border-div">
                                    <form onSubmit={handleSubmit}>
                                        <div class="login-from-area">
                                            <h2>Sign In</h2>
                                            <div>
                                                {error.email && <span className="error-message">{error.email}</span>}
                                                <input type="text"
                                                    class="login-type"
                                                    placeholder="Email or mobile number"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="password-in">
                                                {error.password && <span className="error-message">{error.password}</span>}
                                                <input id="password-field"
                                                    type="password"
                                                    class="login-type"
                                                    placeholder="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <div class="clearfix"></div>
                                                <span toggle="#password-field" class="field-icon fa fa-fw fa-eye toggle-password"></span>
                                            </div>
                                            <div class="remmber-area">
                                                <label class="list_checkBox">Remember me
                                                    <input type="checkbox" name="text" />
                                                    <span class="list_checkmark"></span>
                                                </label>
                                                <a class="forgot-passwords" href="#">Forgot Password?</a>
                                            </div>
                                            {/* <!--<p>By clicking Sign In or continue with Facebook or Google, you agree to all <a href=""> Terms of Service</a> and <a href="#"> Privacy Policy</a></p>--> */}
                                            <button type="submit" class="login-submit">Sign In</button>
                                        </div>
                                    </form>
                                    <div class="or-area">
                                        <span>Or Continue with</span>
                                    </div>
                                    <div class="login-socials-area">
                                        <div class="socials-btns">
                                            <a href="#" class="common-btns facebook-btn">
                                                <img src="./images/login-facebook.png" alt="" /> Facebook
                                            </a>
                                            <a href="#" class="common-btns google-btn">
                                                <img src="./images/login-google.png" alt="" /> Google
                                            </a>
                                        </div>

                                    </div>
                                </div>
                                <div class="bottom-account-div">
                                    <p>Don't have an account? <Link to="/signup">Create Account</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div >
        </>
    )
}

export default Login;