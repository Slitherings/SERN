import React, { useState, useEffect } from 'react';
import './input.css';
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Profile from './pages/Profile';
import Chats from './pages/Chats';
import Modal from 'react-modal';
import Register from './pages/Register';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaResult, setCaptchaResult] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Generate a new random CAPTCHA on initial load
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    // Generate a random 6-digit number for the CAPTCHA
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    setCaptcha(randomNum.toString());
  };

  const handleCaptchaInput = (e) => {
    setCaptchaResult(e.target.value);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  let subtitle;

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Username: ', username);
    console.log('Password: ', password);
    Axios.post('http://localhost:3001/api/login', {
      UserName: username,
      PassWord: password,
    }).then((res) => {
      if (res.data.message) {
        setLoginStatus(res.data.message);
      } else {
        setLoginStatus(res.data[0].username);
        setIsLoggedIn(true); // set isLoggedIn to true
      }
    });
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Perform any other necessary actions
  };

  return (
    <div className="App">
      <Router>
        <h1>{loginStatus}</h1>
        <h1 className="text-4xl">Tickle</h1>
        <nav className="navbar bg-gray-900 text-white py-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/rooms" className="text-blue-500 hover:underline">
                Rooms
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-blue-500 hover:underline">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/chats" className="text-blue-500 hover:underline">
                Chats
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 px-4 py-2 rounded"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={openModal}
                  className="text-white bg-green-500 px-4 py-2 rounded"
                  style={{placeSelf:'center'}}
                >
                  Sign In
                </button>
              )}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <button
                  onClick={closeModal}
                  className="close-button text-white bg-red-500 px-2 py-1 rounded"
                  style={{float: 'right'}}
                >
                  <span>&times;</span>
                </button>
                <form onSubmit={handleSubmit} className="mt-4">
                  <label className="block mb-2">
                    Username
                    <br />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border border-gray-400 px-2 py-1 rounded"
                    />
                  </label>
                  <br />
                  <label className="block mb-2">
                    Password
                    <br />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border border-gray-400 px-2 py-1 rounded"
                    />
                  </label>
                  <br />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Sign-In
                  </button>
                  <Link to="/register" className="text-green-500 hover:underline">
                    Register
                  </Link>
                </form>
              </Modal>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chats" element={<Chats />} />
          <Route path='/register' element={<Register />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
