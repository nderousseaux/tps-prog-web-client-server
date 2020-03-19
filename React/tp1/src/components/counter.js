import React, { useState } from 'react';

const Counter = () =>{
    let [count,setCount] = useState(parseInt(localStorage.getItem('counterValue')) || 0);
    const handleClick = () => {
      
      setCount(count+1);
      localStorage.setItem("counterValue", count+1);

    }
    return <div>
      <button onClick ={handleClick}>Click</button>
      <p>Vous avez cliqué {count} fois.</p>
    </div>
  }
  

export default Counter;