import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
const url = "https://phpwebdevelopmentservices.com/project-react-backend/api/edit-profile";

const EditProfile = () => {
    const [profileData, setProfileData] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [dob, setDob] = useState('');
    const [selectGender, setSelectGender] = useState('');
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [language, setLanguage] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })
    const [message, setMessage] = useState('');

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
    };


    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;
        if (selectedCheckboxes.includes(checkboxValue)) {
            setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== checkboxValue));
        } else {
            setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});
        setMessage('');
        const formData = new FormData();
        formData.append('image', selectedImage);
        const emptyFieldErrors = {};
        if (!name) {
            emptyFieldErrors.name = "Name is required.";
        }
        if (!email) {
            emptyFieldErrors.email = "Email is required.";
        }
        if (!phone) {
            emptyFieldErrors.phone = "phone number is required.";
        }
        const allErrors = {
            ...emptyFieldErrors
        };
        console.log(name, email, phone, dob, aboutMe, selectGender, selectedCheckboxes, language, selectedImage, currentPassword, newPassword, confPassword)
        const authToken = sessionStorage.getItem('ltk') ? sessionStorage.getItem('ltk') : sessionStorage.getItem('rtk');

        try {
            const url = `https://phpwebdevelopmentservices.com/project-react-backend/api/edit-profile?
            name=${name}
            &phone=${phone}
            &email=${email}
            &gender=${selectGender}
            &about_me=${aboutMe}
            &get_around_by=${selectedCheckboxes}
            &date_of_birth=${dob}
            &country_id=${country}
            &state=${state}
            &city=${city}
            &language_id=${language}
            &password=${currentPassword}
            &new_password=${newPassword}
            &confirm_password=${confPassword}`

            fetch(url, {
                headers: {
                    'Content-Type': "multipart/form-data",
                    'X-CSRF-TOKEN': authToken,
                    'accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                method: 'POST',
                body: formData,

            }).then(res => res.json()).then(result => {
                if (result.error) {
                    // console.log(result.error)
                    let errorType = result.error;
                    errorType = Object.values(errorType)
                    // console.log(errorType)

                    errorType.forEach((type) => {
                        // console.log(type[0])
                        switch (type[0]) {
                            case "The email has already been taken.":
                                allErrors.email = "The email has already been taken.";
                                break;
                            case "The phone has already been taken.":
                                allErrors.phone = "The phone has already been taken.";
                                break;
                            case "The name has already been taken.":
                                allErrors.name = "The name has already been taken.";
                                break;
                            case "The phone must be at least 8 characters.":
                                allErrors.phone = "The phone must be at least 8 characters.";
                                break;
                            case "The email must be a valid email address.":
                                allErrors.email = "The email must be a valid email address.";
                                break;
                            case "-701":
                                allErrors.password = "Password not changed, You have entered an incorrect old password!";
                                break;
                            default:
                                console.log("error");
                        }
                    })
                    setError(allErrors);
                }
                else {
                    console.log("successblock", result);
                    setMessage("Profile updated successfully");
                    setProfileData(result);
                }
                // console.log(result)
            })

        } catch (error) {
            console.log("error", error)
        }
    }
    return (
        <>
            <div className='wrapper'>
                <Header></Header>
                <section class="mainDasbordsec">
                    <div class="container">
                        <div class="mainDasbordInr">
                            <div class="row">
                                <div class="col-lg-3 col-md-12 col-sm-12 pl-0">
                                    <div class="dasbordLeftsec">
                                        <a href="#url" class="showmeu" data-toggle="collapse" data-target="#demo"><i class="fa fa-bars"></i>Show Menus</a>
                                        <div class="dasbordLeft ">
                                            <div class="profibx">
                                                <em><img src="assets/images/dachprofi.jpg" alt="" /></em>
                                                <strong>Rabin Mnna</strong>
                                                <ul>
                                                    <li><a href="#"><img src="assets/images/star1.png" alt="" /></a></li>
                                                    <li><a href="#"><img src="assets/images/star1.png" alt="" /></a></li>
                                                    <li><a href="#"><img src="assets/images/star1.png" alt="" /></a></li>
                                                    <li><a href="#"><img src="assets/images/star1.png" alt="" /></a></li>
                                                    <li><a href="#"><img src="assets/images/star2.png" alt="" /></a></li>
                                                    <li><span>(410)</span></li>
                                                </ul>
                                            </div>
                                            <div class="dasbordLeftlink">
                                                <ul>
                                                    <li><a href="#">
                                                        <span>
                                                            <img src="assets/images/dashico1.png" alt="" class="dashico1" />
                                                        </span>
                                                        Dashboard
                                                    </a></li>
                                                    <li><a href="#" class="activ">
                                                        <span>
                                                            <img src="assets/images/dashico2.png" alt="" class="dashico1" />
                                                        </span>
                                                        Edit Profile
                                                    </a></li>
                                                    <li><a href="#">
                                                        <span>
                                                            <img src="assets/images/dashico3.png" alt="" class="dashico1" />
                                                        </span>
                                                        My Order
                                                    </a></li>
                                                    <li><a href="#">
                                                        <span>
                                                            <img src="assets/images/dashico10.png" alt="" class="dashico1" />
                                                        </span>
                                                        My Favorite
                                                    </a></li>
                                                    <li><a href="#">
                                                        <span>
                                                            <img src="assets/images/dashico4.png" alt="" class="dashico1" />
                                                        </span>
                                                        Reviews
                                                    </a></li>

                                                    <li><a href="#">
                                                        <span>
                                                            <img src="assets/images/dashico7.png" alt="" class="dashico1" />
                                                        </span>
                                                        Messages<em>10</em>
                                                    </a></li>
                                                    <li><a href="#">
                                                        <span>
                                                            <img src="assets/images/dashico8.png" alt="" class="dashico1" />
                                                        </span>
                                                        Notifications
                                                        <em>14</em>
                                                    </a></li>
                                                    <li><a href="login.html">
                                                        <span>
                                                            <img src="assets/images/dashico9.png" alt="" class="dashico1" />
                                                        </span>
                                                        Log Out

                                                    </a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-12 col-sm-12 pr-0">
                                    <div class="dasbordRightlink">
                                        <h1>Edit Profile</h1>
                                        <div class="dasbordRightBody">

                                            <div class="editProformBx">
                                                <form onSubmit={handleSubmit}>
                                                    <div class="editProformir">

                                                        <div class="row">
                                                            <div class="col-md-4 col-sm-12">
                                                                <div class="iputBx">
                                                                    <label>Name</label>
                                                                    {error.name && <span className="error-message">{error.name}</span>}
                                                                    <input type="text"
                                                                        placeholder="Enter here"
                                                                        name="name"
                                                                        id="name"
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 col-sm-12">
                                                                <div class="iputBx">
                                                                    <label>Email</label>
                                                                    {error.email && <span className="error-message">{error.email}</span>}
                                                                    <input type="text"
                                                                        placeholder="Enter here"
                                                                        name="email"
                                                                        id="email"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 col-sm-12">
                                                                <div class="iputBx">
                                                                    <label>Phone</label>
                                                                    {error.phone && <span className="error-message">{error.phone}</span>}
                                                                    <input type="text"
                                                                        placeholder="Enter here"
                                                                        name="phone"
                                                                        id="phone"
                                                                        value={phone}
                                                                        onChange={(e) => setPhone(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-12">
                                                                <div class="iputBx">
                                                                    <label>About me</label>
                                                                    <textarea placeholder="Enter your description here..."
                                                                        name='aboutMe'
                                                                        value={aboutMe}
                                                                        onChange={(e) => setAboutMe(e.target.value)}
                                                                    ></textarea>
                                                                </div>
                                                            </div>



                                                            <div class="col-md-5 col-sm-6">
                                                                <div class="iputBx">
                                                                    <label>Date of Birth</label>
                                                                    <input type="date"
                                                                        class="datepicker"
                                                                        placeholder="Enter here"
                                                                        name='dob'
                                                                        value={dob}
                                                                        onChange={(e) => setDob(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="col-md-4 col-sm-6">
                                                                <div class="genfil">
                                                                    <span>Gender</span>
                                                                    <ul>
                                                                        <li>
                                                                            <input type="radio" id="radio1"
                                                                                name="radios"
                                                                                value="M"
                                                                                checked={selectGender === 'M'}
                                                                                onChange={(e) => setSelectGender(e.target.value)}
                                                                            />
                                                                            <label for="radio1">Male</label>
                                                                        </li>
                                                                        <li>
                                                                            <input type="radio"
                                                                                id="radio2"
                                                                                name="radios"
                                                                                value="F"
                                                                                checked={selectGender === 'F'}
                                                                                onChange={(e) => setSelectGender(e.target.value)}

                                                                            />
                                                                            <label for="radio2">Female</label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            <div class="col-sm-12">
                                                                <div class="form_group edt_checkk">
                                                                    <label class="search_label">Travel</label>
                                                                    <ul class="c_ul">
                                                                        <li>
                                                                            <label class="contect_container_checkBox">Bus
                                                                                <input type="checkbox"
                                                                                    value="bus"
                                                                                    checked={selectedCheckboxes.includes('bus')}
                                                                                    onChange={handleCheckboxChange}
                                                                                />
                                                                                <span class="contect_checkmark"></span>
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <label class="contect_container_checkBox">Car
                                                                                <input type="checkbox"
                                                                                    value="car"
                                                                                    checked={selectedCheckboxes.includes('car')}
                                                                                    onChange={handleCheckboxChange}
                                                                                />
                                                                                <span class="contect_checkmark"></span>
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <label class="contect_container_checkBox">Track
                                                                                <input type="checkbox"
                                                                                    value="track"
                                                                                    checked={selectedCheckboxes.includes('track')}
                                                                                    onChange={handleCheckboxChange}
                                                                                />
                                                                                <span class="contect_checkmark"></span>
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <label class="contect_container_checkBox">Walk
                                                                                <input type="checkbox"
                                                                                    value="walk"
                                                                                    checked={selectedCheckboxes.includes('walk')}
                                                                                    onChange={handleCheckboxChange}
                                                                                />
                                                                                <span class="contect_checkmark"></span>
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <label class="contect_container_checkBox">Scooter
                                                                                <input type="checkbox"
                                                                                    value="scooter"
                                                                                    checked={selectedCheckboxes.includes('scooter')}
                                                                                    onChange={handleCheckboxChange}
                                                                                />
                                                                                <span class="contect_checkmark"></span>
                                                                            </label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            {/* <div class="col-sm-12">
                                                                <div class="form_fild_area_m frm_grp arro">
                                                                    <label>Language </label>
                                                                    <select
                                                                        class="chosen-select"
                                                                        onChange={(e) => setLanguage(e.target.value)}
                                                                    >
                                                                        <option value="all">All</option>
                                                                        <option value="hindi">Hindi</option>
                                                                        <option value="english">English</option>
                                                                        <option value="odiya">Odiya</option>
                                                                    </select>
                                                                </div>
                                                            </div> */}

                                                            <div class="col-sm-12">
                                                                <div class="uplodimg">
                                                                    <span>Profile Image</span>
                                                                    <div class="uplodimgfil">
                                                                        <input type="file"
                                                                            name="file-1[]" id="file-1"
                                                                            class="inputfile inputfile-1"
                                                                            onChange={handleImageChange}


                                                                        />
                                                                        <label for="file-1"

                                                                        >Click here to Upload Profile Image<img src="assets/images/clickhe.png" alt="" /></label>
                                                                    </div>
                                                                    <div class="uplodimgfilimg">
                                                                        <em><img src="assets/images/uplodimg.jpg" alt="" /></em>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div class="locatioSec">
                                                            <h3>Location</h3>
                                                            <div class="row">
                                                                <div class="col-md-4 col-sm-6">
                                                                    <div class="iputBx">
                                                                        <label>Country</label>
                                                                        <select onChange={(e) => setCountry(e.target.value)}>
                                                                            <option value={1}>India</option>
                                                                            <option value={2}>USA</option>
                                                                            <option value={3}>UK</option>
                                                                            <option value={4}>Nepal</option>
                                                                            <option value={5}>Germany</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-6">
                                                                    <div class="iputBx">
                                                                        <label>State</label>
                                                                        <input type="text"
                                                                            placeholder="Enter here"
                                                                            name="state"
                                                                            value={state}
                                                                            onChange={(e) => setState(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-12">
                                                                    <div class="iputBx">
                                                                        <label>City</label>
                                                                        <input type="text"
                                                                            placeholder="Enter your full address"
                                                                            name="city"
                                                                            value={city}
                                                                            onChange={(e) => setCity(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div class="locatioSec">
                                                            <h3>Change password</h3>
                                                            <div class="row">
                                                                <div class="col-md-4 col-sm-6">
                                                                    <div class="iputBx">
                                                                        <label>Current password</label>
                                                                        {error.password && <span className="error-message">{error.password}</span>}
                                                                        <input type="password"
                                                                            placeholder="Enter here"
                                                                            name="currentPassword"
                                                                            value={currentPassword}
                                                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-6">
                                                                    <div class="iputBx">
                                                                        <label>New password</label>
                                                                        <input type="password"
                                                                            placeholder="Enter here"
                                                                            name="newPassword"
                                                                            value={newPassword}
                                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-12">
                                                                    <div class="iputBx">
                                                                        <label>Confirm password</label>
                                                                        <input type="password"
                                                                            placeholder="Enter here"
                                                                            name="confPassword"
                                                                            value={confPassword}
                                                                            onChange={(e) => setConfPassword(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div class="footdashSec">

                                                            <button type="submit" className="subbtn">Save all changes</button>&nbsp;
                                                            {message && (
                                                                <span className='pro_updt_msg'>{message}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer></Footer>
            </div>
        </>
    );
}

export default EditProfile;