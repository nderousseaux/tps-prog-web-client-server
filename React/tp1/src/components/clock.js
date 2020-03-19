import React, { useState } from 'react';

const Clock = () => {

    let [time, setTime] = useState(new Date().toLocaleTimeString())
  
    setInterval(() => {
        setTime(new Date().toLocaleTimeString());
    }, 1000);
  
    return (
        <p>{ time }</p>
    );
  };
  

export default Clock;