import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Register = () => {
  // Define state for the user registration form
  const [loginStatus, setLoginStatus] = useState('');
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaResult, setCaptchaResult] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Generate a new random CAPTCHA on initial load
    generateCaptcha();
  }, []);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const generateCaptcha = () => {
    // Generate a random 6-digit number for the CAPTCHA
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    setCaptcha(randomNum.toString());
  };

  const handleCaptchaInput = (e) => {
    setCaptchaResult(e.target.value);
  };

  const submitInfo = () => {
    // Check if CAPTCHA is correct before submitting the form
    if (captchaResult === captcha) {
      Axios.post('http://localhost:3001/api/insert', {
        UserName: userName,
        PassWord: passWord,
      }).then(() => {
        alert('Successful Register');
      });
    } else {
      alert('Incorrect CAPTCHA. Please try again.');
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary actions with the form data
    console.log(formData);
    // Reset the form fields
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    Axios.post('http://localhost:3001/api/login', {
      UserName: formData.username,
      PassWord: formData.password,
    }).then((res) => {
      if (res.data.message) {
        setLoginStatus(res.data.message);
      } else {
        setLoginStatus(res.data[0].username);
        setIsLoggedIn(true); // set isLoggedIn to true
      }
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="block mb-2 mt-4">
            Enter the numbers in the image below:
        </label>
        <div className="captcha-container">
            <div className="captcha border border-gray-400 px-4 py-2 rounded">
              {captcha}
            </div>
            <input
              type="text"
              name="Captcha"
              onChange={handleCaptchaInput}
              className="captcha-input border border-gray-400 px-2 py-1 rounded"
            />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
