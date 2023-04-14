// src/components/ChatroomList.js
import React from 'react';

const ChatroomList = ({ chatrooms, onChatroomSelect }) => {
  return (
    <div>
      <h2>Available Chatrooms</h2>
      <ul>
        {chatrooms.map((chatroom) => (
          <li key={chatroom.id}>
            <button onClick={() => onChatroomSelect(chatroom.id)}>
              {chatroom.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatroomList;
