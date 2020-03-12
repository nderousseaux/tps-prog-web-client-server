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



//************************************************ */

const ItemsList = ({items, updateItem, removeItem}) => {
  return <ul>
    {items.map((item, index) => (
      <li key={index}>
        {`${item.name} : ${item.cost} x${item.quantity}  `}
				<button onClick={() => removeItem(index)}>x</button>
      </li>
    ))}
  </ul>
};
const AddItemForm = ({addItem}) => {
  let [currentItem, setCurrentItem] = useState({
    name: '',
    cost: 1,
    quantity : 1
  });

  const handleChange = event => {
        let newItem = {...currentItem}
        newItem[event.target.name] = event.target.value;
        setCurrentItem(newItem);
    }

  const handleSubmit = event => {
    event.preventDefault();
    addItem(currentItem);
    setCurrentItem({ // Clear input
            name: '',
            cost: 0,
            quantity: 0
		});
    }


  return <form onSubmit={handleSubmit}>
    
    <input type='text' value={currentItem.name} name='name' placeholder='Nom' onChange={handleChange} />
    <input type='number' value={currentItem.cost} name='cost' onChange={handleChange} />
    <input type='number' value={currentItem.quantity} name='quantity' onChange={handleChange} />
    <input type='submit' value='Ajouter' />
  </form>;
};
const ItemsApp = () => {
  const [items, setItems] = useState([]);

  const removeItem = (index) =>{
    setItems(items => items.filter((i, idx) => idx !== index)); 
  }
  
  const addItem = (item) =>{
    setItems(items =>[{name: item.name, cost: item.cost, quantity: item.quantity},...items]);
  }

  return <>
      <AddItemForm addItem={addItem} />
      <ItemsList items={items} removeItem={removeItem} />
      <p>Total cost : { items.reduce((acc, i) => acc + i.cost* i.quantity, 0) }</p>
  </>;
}











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
