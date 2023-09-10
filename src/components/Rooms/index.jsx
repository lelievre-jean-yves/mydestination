import React from 'react';
import { CardRoom } from '../CardRoom';
import './style.scss';



export function Rooms({name, rooms, adress}) {


  return (
    <div className="rooms">
      {rooms.map((room) => (
        <CardRoom
          key={room.id}
          {...room}
          hotelName={name}
          address={adress}
        />
      ))}
    </div>
  );
}



