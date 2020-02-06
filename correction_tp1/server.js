const
express = require('express'),
Sequelize = require('sequelize'),
bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json());


// create Sequelize instance
const sequelize = new Sequelize('w4a', 'w4a', 'w4aw4aw4a', {
	host: 'localhost',
	port: 3306,
	dialect: 'mysql',
	dialectOptions: { decimalNumbers: true }
	// logging: false
});

// create models
class Person extends Sequelize.Model { }

Person.init({
	lastname: Sequelize.STRING,
	firstname: Sequelize.STRING
}, {
	sequelize,
	modelName: 'Person'
});

// sync DB
sequelize.sync();

// create controllers
const personCtrl = {

	get_all: (req, res, next) => {
		return Person.findAll({
			order: ['lastname'] // sort results by lastname
		})
		.then((people) => res.json(people))
		.catch((err) => next(err));
	},

	get_by_id: (req, res, next) => {
		return Person.findByPk(req.params.person_id)
		.then((person) => {
			if (!person) {
				throw { status: 404, message: 'Requested Person not found' };
			}
			return res.json(person);
		})
		.catch((err) => next(err));
	},

	create: (req, res, next) => {
		const data = {
			firstname: req.body.firstname || '', // use empty string if not defined
			lastname: req.body.lastname || '' // use empty string if not defined
		};
		return Person.create(data)
		.then((person) => res.json(person))
		.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return Person.findByPk(req.params.person_id)
		.then((person) => {
			if (!person) {
				throw { status: 404, message: 'Requested Person not found' };
			}
			Object.assign(person, req.body);
			return person.save();
		})
		.then((person) => res.json(person))
		.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return Person.findByPk(req.params.person_id)
		.then((person) => {
			if (!person) {
				throw { status: 404, message: 'Requested Person not found' };
			}
			return person.destroy();
		})
		.then(() => res.status(200).end())
		.catch((err) => next(err));
	}

};

// register routes
app.get('/person', personCtrl.get_all);
app.post('/person', personCtrl.create);
app.get('/person/:person_id', personCtrl.get_by_id);
app.put('/person/:person_id', personCtrl.update_by_id);
app.delete('/person/:person_id', personCtrl.delete_by_id);

// register error handling middleware
app.use((err, req, res, next) => {
	if (err.status === undefined) {
		return res.status(500).send(err.message);
	} else {
		return res.status(err.status).send(err.message);
	}
});

// launch server
const server = app.listen(3000, () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});
