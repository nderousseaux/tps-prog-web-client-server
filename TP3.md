# Organisation extensible

Créer les dossiers suivants :
- models
- controllers
- routes

## Modèles

Le dossier `models` est organisé comme suit :
- des fichiers `[nom_modele].js` contenant chacun la définition d'un modèle
- un fichier `index.js` chargé d'initialiser l'objet sequelize puis de charger les définitions des modèles et de réaliser les associations

Le code ci-après est celui du fichier `index.js`.
Les commentaires devraient vous suffire à comprendre son fonctionnement.
```js
const
fs = require('fs'),
Sequelize = require('sequelize');

// create Sequelize instance
const sequelize = new Sequelize('[db_name]', '[username]', '[password]', {
	host: '[hostname]',
	port: 3306,
	dialect: 'mysql',
	dialectOptions: { decimalNumbers: true }
});

// this object will contain the model objects
// each key being the model's name
const db = {};

// read the files of the current directory
fs.readdirSync(__dirname)
.filter((filename) => filename !== 'index.js') // avoid this file
.forEach((filename) => {
	const model = require('./' + filename)(sequelize); // get the model definition
	db[model.name] = model; // add the entry in the db object
});

// go through each entry of the db object
Object.keys(db).forEach((modelName) => {
	// call the "associate" function on the model object
	// and pass it the db object (so that it can have access to other models)
	db[modelName].associate(db);
});

// sync the DB
sequelize.sync();

// expose the db object
module.exports = db;
```

Dans ce code, on voit que l'on `require` chacun de nos fichiers dans lequel on définit un modèle.
Ce code s'attend à ce que le type obtenu soit une fonction, que l'on appelle immédiatement en lui passant l'instance `sequelize`, et qui nous retourne le modèle défini.

On observe également que l'on fait ensuite appel à la fonction `associate` sur chaque modèle.
Cette fonction doit faire partie des méthodes de classe du modèle, elle reçoit l'objet `db` en paramètre et c'est à cet endroit que l'on va déclarer d'éventuelles relations entre ce modèle et d'autres modèles définis dans `db` (voir https://sequelize.org/v5/manual/models-definition.html#expansion-of-models pour la documentation sur l'ajout de méthodes aux modèles).

Le code ci-dessous illustre un exemple de module définissant un modèle.
```js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {

	class Bidule extends Sequelize.Model {
		static associate(db) {
			Bidule.hasMany(db.Machin);
		};
	}
	
	Bidule.init({
		bla: Sequelize.STRING,
		bli: Sequelize.STRING
	}, {
		sequelize,
		modelName: 'Bidule'
	});
	
	return Bidule;

};
```

## Contrôleurs

Chaque fichier du dossier `controllers` définit un module qui exporte un objet contenant des fonctions qui seront utilisées en tant que middleware de nos routes `express`.
Comme on y utilise certainement les modèles, ces fichiers démarrent la plupart du temps par importer l'objet `db` contenant leur définition.
La fonction `require` générant un singleton, chacun des fichiers contrôleur peut récupérer l'objet `db` sans risquer d'exécuter plusieurs fois le code de définition des modèles.

Le code ci-dessous illustre un exemple de module définissant un contrôleur.
```js
const db = require('../models');

module.exports = {
	
	get_all: (req, res, next) => {
		return db.Bidule.findAll()
		.then((bidules) => res.json(bidules))
		.catch((err) => next(err));
	};

};
```

## Routes

Le dossier `routes` est organisé comme suit :
- des fichiers `[nom_routes].js` contenant chacun des déclarations de routes
- un fichier `index.js` qui charge les fichiers précédents et enregistre les routes auprès de l'application `express`

Voici du code pour le fichier `index.js` :
```js
const
fs = require('fs');

module.exports = (app) => {
	
	// read the files of the current directory
	fs.readdirSync(__dirname)
	.filter((filename) => filename !== 'index.js') // avoid this file
	.forEach((filename) => {
		// load routes array and register them
		require('./' + filename).forEach((r) => {
			app[r.method](r.url, r.func);
		});
	});

};
```

Dans ce code, on voit que chaque module chargé exporte un tableau d'objets (utilisation de la fonction `forEach` sur le résultat du `require`) contenant des informations sur les routes à enregistrer.
En particulier, on s'attend à ce que chaque objet du tableau contienne :
- un champ `method` indiquant la méthode HTTP
- un champ `url` indiquant l'url de la route
- un champ `func` qui peut être un middleware ou un tableau de middlewares

Le code ci-dessous illustre un exemple de module définissant des routes :
```js
const bidule_ctrl = require('../controllers/bidule');

module.exports = [
	
	{
		url: '/bidule',
		method: 'get',
		func: bidule_ctrl.get_all
	}

];

```

## Application Express

Etant donné que les modules définissant les routes chargent les contrôleurs nécessaires, et que les modules définissant les contrôleurs chargent les modèles, l'application principale est réduite à la création de l'application `express`, le chargement du module `routes` et le lancement de l'écoute.
