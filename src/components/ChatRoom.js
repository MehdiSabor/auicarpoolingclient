import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://auicarpoolingserver.onrender.com/');

const Chatroom = ({ chatroomId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit('join chatroom', chatroomId);

    socket.on('receive message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('receive message');
    };
  }, [chatroomId]);

  const sendMessage = () => {
    if (message) {
      const newMessage = {
        userId,
        message,
        timestamp: new Date().toISOString()
      };
      socket.emit('send message', chatroomId, newMessage);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chatroom</h2>
      <div>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.userId}</strong>: {msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatroom;
