import React, { useState } from 'react';
import axios from "axios";
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const url = "https://phpwebdevelopmentservices.com/project-react-backend/api/register";
const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confPassword: ''
    })
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const emptyFieldErrors = {};
        if (!name) {
            emptyFieldErrors.name = "Name is required.";
        }
        if (!email) {
            emptyFieldErrors.email = "Email is required.";
        }
        if (!mobileNumber) {
            emptyFieldErrors.phone = "Mobile number is required.";
        }
        if (!password) {
            emptyFieldErrors.password = "Password is required.";
        }
        if (!confPassword) {
            emptyFieldErrors.confPassword = "Confirm password is required.";
        }

        const allErrors = {
            ...emptyFieldErrors
        };

        const regDetails = {
            "name": name,
            "email": email,
            "phone": mobileNumber,
            "password": password,
            "password_confirmation": confPassword,
        }

        let res = await axios.post(url, {
            params: regDetails
        })
        res = res.data;
        if (res.error) {
            let errorType = res.error;
            errorType = Object.values(errorType)
            console.log(errorType)

            errorType.forEach((type) => {
                switch (type[0]) {
                    case "The email must be a valid email address.":
                        allErrors.email = "The email must be a valid email address.";
                        break;
                    case 'The phone must be at least 8 characters.':
                        allErrors.phone = "The phone must be at least 8 characters.";
                        break;
                    case "The password must be at least 8 characters.":
                        allErrors.password = "The password must be at least 8 characters.";
                        break;
                    case "The password confirmation must be at least 8 characters.":
                        allErrors.confPassword = "The password confirmation must be at least 8 characters.";
                        break;
                    case "Phone number already taken.":
                        allErrors.phone = "Phone number already taken.";
                        break;
                    case "Email already taken.":
                        allErrors.email = "Email already taken."
                        break;
                    case "The password confirmation does not match.":
                        allErrors.confPassword = "The password confirmation does not match."
                        break;
                    case "The phone may not be greater than 10 characters.":
                        allErrors.phone = "The phone may not be greater than 10 characters.";
                        break;
                    default:
                        console.log('unexpected error');
                }
            })
            setError(allErrors);
        } else {
            setMessage("Congratulations, You have successFully Registered")
            console.log(res);
            let user = res.result.userData;
            let regIn = user.name;
            let rtk = res.result.token;
            sessionStorage.setItem("rtk",rtk);
            sessionStorage.setItem("regIn",regIn);
            setUserData(user);
            setName('');
            setEmail('');
            setPassword('');
            setMobileNumber('');
            setConfPassword('');
            setTimeout(()=>{
                navigate('/editprofile');
            },1500)
            
        }
    }
    return (
        <>
            <div className='wrapper'>
                <Header></Header>
                <div className="search_main_section">
                    <div className="container">
                        <div className="row res_padd">
                            {message && (<div className='success-msg'>
                                <div className="jumbotron">
                                    {userData && (<>
                                        <h1 className="display-4">Hello, {userData.name}</h1>
                                    </>)}
                                    <p className="lead">{message}</p>
                                </div>
                            </div>)}
                            <div className="main-center-div">
                                <div className="top-border-div">
                                    <div className="login-from-area">
                                        <form onSubmit={handleSubmit}>
                                            <h2>Create Account</h2>
                                            <div>
                                                {error.name && <span className="error-message">{error.name}</span>}
                                                <input type="text"
                                                    className="login-type"
                                                    placeholder="Full name"
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />

                                                <div className="clearfix"></div>
                                            </div>

                                            <div>
                                                {error.email && <span className="error-message">{error.email}</span>}
                                                <input type="text"
                                                    className="login-type"
                                                    placeholder="Email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />

                                                <div className="clearfix"></div>
                                            </div>

                                            <div>
                                                {error.phone && <span className="error-message">{error.phone}</span>}
                                                <input type="text"
                                                    className="login-type"
                                                    placeholder="Mobile number"
                                                    name="mobileNumber"
                                                    value={mobileNumber}
                                                    onChange={(e) => setMobileNumber(e.target.value)}
                                                />

                                                <div className="clearfix"></div>
                                            </div>


                                            <div className="password-in">
                                                {error.password && <span className="error-message">{error.password}</span>}
                                                <input id="password-field"
                                                    type="password"
                                                    className="login-type"
                                                    name="password"
                                                    placeholder="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />

                                                <div className="clearfix"></div>
                                                <span toggle="#password-field" className="field-icon fa fa-fw fa-eye toggle-password"></span>
                                            </div>
                                            <div className="password-in">
                                                {error.confPassword && <span className="error-message">{error.confPassword}</span>}
                                                <input id="confpassword-field"
                                                    type="password"
                                                    className="login-type"
                                                    name="confPassword"
                                                    placeholder="Confirm password"
                                                    value={confPassword}
                                                    onChange={(e) => setConfPassword(e.target.value)}
                                                />

                                                <div className="clearfix"></div>
                                                <span toggle="#password-field" className="field-icon fa fa-fw fa-eye toggle-password"></span>
                                            </div>
                                            <p>By clicking Sign In or continue with Facebook or Google, you agree to all <a href=""> Terms of Service</a> and <a href="#"> Privacy Policy</a></p>
                                            <button type="submit" className="login-submit">Sign up</button>
                                        </form>
                                    </div>
                                    <div className="or-area">
                                        <span>Or Continue with</span>
                                    </div>
                                    <div className="login-socials-area">
                                        <div className="socials-btns">
                                            <a href="#" className="common-btns facebook-btn">
                                                <img src="./images/login-facebook.png" alt="" /> Facebook
                                            </a>
                                            <a href="#" className="common-btns google-btn">
                                                <img src="./images/login-google.png" alt="" /> Google
                                            </a>
                                        </div>

                                    </div>
                                </div>
                                <div className="bottom-account-div">
                                    <p>Already have an account? <Link to="/login">Login</Link></p>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Signup;