const db = require('../models');
Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
	
	get_all: (req, res, next) => {
		if(req.query.lastname !== undefined){
			return db.Person.findAll({
				order: [ 'lastname' ],
				where: {lastname: {[Op.like]: req.query.lastname}}
			})
			.then((people) => res.json(people))
			.catch((err) => next(err));
		}
		else{
			return db.Person.findAll({
				order: [ 'lastname' ]
			})
			.then((people) => res.json(people))
			.catch((err) => next(err));
		}
		
	},
	
	load_by_id: (req, res, next) => {
		return db.Person.findByPk(req.params.person_id)
		.then((person) => {
			if (!person) {
				throw { status: 404, message: 'Requested Person not found' };
			}
			req.person = person;
			return next();
		})
		.catch((err) => next(err));
	},
	
	get_by_id: (req, res, next) => {
		return db.Person.findByPk(req.params.person_id)
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
			firstname: req.body.firstname || '',
			lastname: req.body.lastname || ''
		};
		return db.Person.create(data)
		.then((person) => res.json(person))
		.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return db.Person.findByPk(req.params.person_id)
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
		return db.Person.findByPk(req.params.person_id)
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
