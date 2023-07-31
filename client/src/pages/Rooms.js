import React, { useState } from 'react';

const Rooms = () => {
  // Define state for the rooms
  const [rooms, setRooms] = useState([]);

  // Function to add a new room
  const addRoom = () => {
    // Generate a unique room ID (you can use any logic here)
    const roomId = Math.floor(Math.random() * 1000);

    // Create a new room object
    const newRoom = {
      id: roomId,
      name: `Room ${roomId}`,
    };

    // Add the new room to the state
    setRooms([...rooms, newRoom]);
  };

  return (
    <div>
      <h2>Rooms</h2>
      <button onClick={addRoom}>Add Room</button>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
