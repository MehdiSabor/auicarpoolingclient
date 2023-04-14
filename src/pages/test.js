// src/pages/Test.js
import React, { useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import ChatRoomList from '../components/ChatroomList';

const Test = () => {
  const storedUserInfo = sessionStorage.getItem('userInfo');
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const [selectedChatroomId, setSelectedChatroomId] = useState(null);

  const chatrooms = [
    // Replace this with actual chatroom data
    { id: 'chatroom1', name: 'Chatroom 1' },
    { id: 'chatroom2', name: 'Chatroom 2' },
  ];

  const handleChatroomSelect = (chatroomId) => {
    setSelectedChatroomId(chatroomId);
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <ChatRoomList chatrooms={chatrooms} onChatroomSelect={handleChatroomSelect} />
      {selectedChatroomId && (
        <ChatRoom chatroomId={selectedChatroomId} userId={userInfo.name} />
      )}
    </div>
  );
};

export default Test;
