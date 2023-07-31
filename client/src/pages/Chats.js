import React, { useState } from 'react';

const Chats = () => {
  // Define state for the chat messages
  const [messages, setMessages] = useState([]);
  // Define state for the user's current message
  const [currentMessage, setCurrentMessage] = useState('');

  // Function to handle input changes
  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  // Function to handle sending a message
  const sendMessage = () => {
    if (currentMessage.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: currentMessage.trim(),
        sender: 'user',
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setCurrentMessage('');
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div className="message-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={currentMessage}
          onChange={handleChange}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chats;
