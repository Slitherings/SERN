import React, { useState } from 'react';

const Modal = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className={show ? 'modal display-block' : 'modal display-none'}>
      <section className='modal-main'>
        <h2>Sign In</h2>
        <form>
          <label>
            Username
            <br>
              <input type='text' value={username} onChange={handleUsernameChange} />
            </br>
          </label>
          <label>
            Password
            <br>
              <input type='password' value={password} onChange={handlePasswordChange} />
            </br>
          </label>
          <label>
            Remember me:
            <input type='checkbox' checked={rememberMe} onChange={handleRememberMeChange} />
          </label>
          <button onClick={handleClose}>Close</button>
          <button type='submit'>Sign In</button>
        </form>
      </section>
    </div>
  );  
};

export default Modal;
