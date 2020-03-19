import React, { useState } from 'react';

const Toggle = () => {

    let [b,setB] = useState((localStorage.getItem('toggleValue') === "true"));
    const handleClick = () =>{
      setB(!b);
      localStorage.setItem("toggleValue", !b);
    }
    return <p>
      <button onClick={handleClick}>Change</button>
      {b ? "TRUE" : "FALSE"};
    </p>
}

export default Toggle;