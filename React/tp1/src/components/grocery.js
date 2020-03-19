import React,{useState} from 'react';
import usePersistedState from "../persistedState"

const Item = ({item, updateItem}) => <>
  <input
    type="text"
    value={item.name}
    onChange={e => updateItem({name: e.target.value})}
  />
  Cost :<input
    type="number"
    value={item.cost}
    onChange={e => updateItem({cost: parseInt(e.target.value, 10)})}
  />
  <input
    type="number"
    value={item.quantity}
    onChange={e => updateItem({quantity: parseInt(e.target.value, 10)})}
  />
</>;

const ItemsList = ({items, updateItem, removeItem}) => <ul>
    { items.map((item, idx) => (
      <li key={idx}>
          <Item item={item} updateItem={(changes) => updateItem(idx, changes)} />
          <button onClick={() => removeItem(idx)}>Remove</button>
      </li>
    )) }
</ul>;

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
              cost: 1,
              quantity: 1
          });
      }
  
  
    return <form onSubmit={handleSubmit}>
      
      <input type='text' value={currentItem.name} name='name' placeholder='Nom' onChange={handleChange} />
      Cost<input type='number' value={currentItem.cost} name='cost' onChange={handleChange} />
      Quantity<input type='number' value={currentItem.quantity} name='quantity' onChange={handleChange} />
      <input type='submit' value='Ajouter' />
    </form>;
  };

  

  const Grocery = () => {

    const [items, setItems] = usePersistedState("grocery", []);

    const removeItem = (index) =>{
      setItems(items => items.filter((i, idx) => idx !== index)); 
    }
    
    const addItem = (item) =>{
      setItems(items => [item, ...items].sort((a, b) => a.name.localeCompare(b.name)));
    }

    const updateItem = (index, changes) => {
      //On parcourt tout les items, si l'index est identique, on ecrase les valeurs de i par les valeurs de changes
      setItems(items => items.map((i, idx) => idx !== index ? i : { ...i, ...changes}));
    }
  
    return <>
        <AddItemForm addItem={addItem} />
        <ItemsList items={items} updateItem={updateItem} removeItem={removeItem} />
        <p>Total cost : { items.reduce((acc, i) => acc + i.cost* i.quantity, 0) }</p>
    </>;
  }
export default Grocery;