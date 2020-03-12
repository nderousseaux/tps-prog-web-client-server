import React, { useState } from 'react';

// la sauvegarde des données en localStorage n'est pas faite ici..

// ItemsList
// =========

const ItemsList = ({items, removeItem}) => (
	<ul>
		{ items.map((item, idx) => (
			<li key={idx}>
				{item}
				<button onClick={() => removeItem(idx)}> Remove </button>
			</li>
		)) }
	</ul>
);

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

// ItemsApp
// ========

const ItemsApp = () => {
	const [items, setItems] = useState([]);

	const addItem = (text) => {
		setItems(items => [text, ...items].sort((a, b) => a.localeCompare(b)));
	};

	const removeItem = (index) => {
		setItems(items => items.filter((i, idx) => idx !== index));
	};

	return <>
		<AddItemForm addItem={addItem} />
		<ItemsList
			items={items}
			removeItem={removeItem}
		/>
	</>;
};

export default ItemsApp;
