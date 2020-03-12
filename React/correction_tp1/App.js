import React, { useState, useEffect } from 'react';

import './App.css';

// Ce composant Toggle reçoit une fonction onChange
// qu'il appelle avec son nouvel état à chaque changement.
// Cela permet à son parent d'être prévenu à chaque changement d'état
const Toggle = ({onChange}) => {
	const [on, setOn] = useState(false);
	const handleChange = () => {
		setOn(!on);
		onChange(!on);
	};
	return <div>
		<p>Toggle is { on ? 'ON' : 'OFF' }</p>
		<button onClick={handleChange}>Change value</button>
	</div>;
};

// Ce composant gère et affiche l'état d'un compteur
// Un bouton permet d'incrémenter la valeur
const Counter = () => {
	const [count, setCount] = useState(0);
	return <div>
		<p>Value: {count}</p>
		<button onClick={() => setCount(c => c+1)}>Increment</button>
	</div>;
};

// Ce custom hook permet à n'importe quel composant
// d'utiliser une horloge qui se met à jour chaque seconde
const useClock = () => {
	const [time, setTime] = useState(new Date().toLocaleTimeString());
	
	useEffect(() => {
		const id = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
		}, 1000);
		return () => clearInterval(id);
	}, []);

	return time;
};

// Ce composant gère et affiche une horloge qui se met à jour à chaque seconde
// Un custom hook n'est qu'une simple fonction (comme si on mettait
// le code du custom hook directement dans ce composant)
const Clock = () => {
	const time = useClock();
	return <p>It is {time}</p>;
};

const App = () => {
	const [showClock, setShowClock] = useState(true);
	const [nbOn, setNbOn] = useState(0);

	return (
		<div className="App">
			<Toggle onChange={(v) => { if (v) setNbOn(n => n+1) }} />
            <p>Nb times toggle on: {nbOn}</p>
			<Counter />
			<div>
				<label>Show clock</label>
				<input type="checkbox" checked={showClock} onChange={(e) => setShowClock(e.target.checked)} />
			</div>
			{ showClock && <Clock /> }
		</div>
	);
};

export default App;
