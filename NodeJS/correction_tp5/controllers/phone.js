const db = require('../models');

module.exports = {
	
	get_all: (req, res, next) => {
		let where = {};
		if (req.query.type) {
			where.type = req.query.type;
		}
		return req.person.getPhones({
			order: [ 'type' ],
			where
		})
		.then((phones) => res.json(phones))
		.catch((err) => next(err));
	},
	
	get_by_id: (req, res, next) => {
		return req.person.getPhones({
			where: {
				id: req.params.phone_id
			}
		})
		.then((phones) => {
			if (phones.length === 0) {
				throw { status: 404, message: 'Requested Phone not found' };
			}
			return res.json(phones[0]);
		})
		.catch((err) => next(err));
	},

	create: (req, res, next) => {
		const data = {
			number: req.body.number || '',
			type: req.body.type || 'home'
		};
		return req.person.createPhone(data)
		.then((phone) => res.json(phone))
		.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return req.person.getPhone({
			where: {
				id: req.params.phone_id
			}
		})
		.then((phones) => {
			if (phones.length === 0) {
				throw { status: 404, message: 'Requested Phone not found' };
			}
			Object.assign(phones[0], req.body);
			return phones[0].save();
		})
		.then((phone) => res.json(phone))
		.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return req.person.getPhones({
			where: {
				id: req.params.phone_id
			}
		})
		.then((phones) => {
			if (phones.length === 0) {
				throw { status: 404, message: 'Requested Phone not found' };
			}
			return phones[0].destroy();
		})
		.then(() => res.status(200).end())
		.catch((err) => next(err));
	}

};
