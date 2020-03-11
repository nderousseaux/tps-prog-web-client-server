import React from 'react';
import { HashRouter, Link, Switch, Route, Redirect } from 'react-router-dom';

import Items from './Items';
import Grocery from './Grocery';

const Menu = () => {
	return <ul>
		<li><Link to="/">Home</Link></li>
		<li><Link to="/items">Items</Link></li>
		<li><Link to="/grocery">Grocery</Link></li>
	</ul>;
};

const App = () => {
	return <HashRouter>
		<Menu />
		<Switch>
			<Route exact path="/">
				<h1>Welcome</h1>
			</Route>
			<Route path="/items">
				<Items />
			</Route>
			<Route path="/grocery">
				<Grocery />
			</Route>
			<Redirect to="/" />
		</Switch>
	</HashRouter>;
};

export default App;
