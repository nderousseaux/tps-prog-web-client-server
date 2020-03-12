import React, { useState } from 'react';

// la modification des éléments de la liste n'est pas gérée ici
// à vous de le faire..

// la sauvegarde des données en localStorage n'est pas faite ici non plus..

// Item
// ====

const Item = ({item}) => <>
	<p>Name: {item.name}</p>
    <p>Cost: {item.cost}€</p>
    <p>Quantity: {item.quantity}</p>
</>;

// ItemsList
// =========

const ItemsList = ({items, updateItem, removeItem}) => <ul>
	{ items.map((item, idx) => (
		<li key={idx}>
			<Item item={item} updateItem={(changes) => updateItem(idx, changes)} />
			<button onClick={() => removeItem(idx)}> Remove </button>
		</li>
	)) }
</ul>;

// AddItemForm
// ===========

const AddItemForm = ({addItem}) => {
	const [currentText, setCurrentText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		addItem(currentText);
		setCurrentText('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={currentText}
				onChange={e => setCurrentText(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
};

// GroceryApp
// ===========

const GroceryApp = () => {
	const [items, setItems] = useState([]);

	const addItem = (text) => {
		setItems(items => [
			{name: text, cost: 1, quantity: 1},
			...items
		]);
	};

	const removeItem = (index) => {
		setItems(items => items.filter((i, idx) => idx !== index));
	};

	return <>
		<h1>Grocery list</h1>
		<AddItemForm addItem={addItem} />
		<ItemsList
			items={items}
			removeItem={removeItem}
		/>
		<h3>Total cost : { items.reduce((acc, i) => acc + i.cost * i.quantity, 0) }</h3>
	</>;
};

export default GroceryApp;
