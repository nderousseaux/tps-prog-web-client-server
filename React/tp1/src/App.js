import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';

const Toggle = () => {
  let [b,setB] = useState(true);
  const handleClick = () =>{
    setB(!b);
  }
  return <p>
    <button onClick={handleClick}>Change</button>
    {b ? "TRUE" : "FALSE"};
  </p>
}


const Counter = () =>{
  let [count,setCount] = useState(0);
  const handleClick = () => {
    setCount(count+1);
  }
  return <p>
    <button onClick ={handleClick}>Click</button>
    <p>Vous avez cliqué {count} fois.</p>
  </p>
}



function App() {
  return (<div>
      <div>
        <h1>Toggle :</h1>
        <Toggle />
      </div>
      <div>
        <h1>Compteur :</h1>
        <Counter />
      </div>
      <div>
        <h1>Clock :</h1>
        <p>Nupe</p>
      </div>
    </div>
  );
}

export default App;
