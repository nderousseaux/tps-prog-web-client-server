import React,{useState} from 'react';
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

const Clock = () => {

  let [time, setTime] = useState(new Date().toLocaleTimeString())

  setInterval(() => {
      setTime(new Date().toLocaleTimeString());
  }, 1000);

  return (
      <p>{ time }</p>
  );
};

const ItemsApp = () => {
  const [items, setItems] = useState([]);

  const removeItem = (index) =>{
    setItems(items => items.filter((i, idx) => idx !== index)); 
  }
  
  const addItem = (i) =>{
    setItems(items =>[...items, i]);
  }

  return <>
      <AddItemForm addItem={addItem} />
      <ItemsList items={items} removeItem={removeItem} />
  </>;
}

const AddItemForm = ({addItem}) => {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text !== '') {
      addItem(text);
      setText(text =>'');
    }
  };
  return <form onSubmit={handleSubmit}>
    <input value={text} onChange={(e) => { setText(e.target.value); }} />
    <button>Add</button>
  </form>;
};

const ItemsList = ({items, removeItem}) => {
  return <ul>
    {items.map((item, index) => (
      <li>
        {item}
        <button onClick={() => removeItem(index)}>X</button>
      </li>
    ))}
  </ul>
};





function App() {
  return (<div>
    <h1>TP n°1</h1>
      <div>
        <h2>Toggle :</h2>
        <Toggle />
      </div>
      <div>
        <h2>Compteur :</h2>
        <Counter />
      </div>
      <div>
        <h2>Clock :</h2>
        <Clock />
      </div>
      <h1>TP n°2</h1>
      <div>
        <h2>Items Form :</h2>
        <ItemsApp />
      </div>
    </div>
  );
}

export default App;
