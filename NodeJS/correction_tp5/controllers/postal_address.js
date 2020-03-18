const db = require('../models');

module.exports = {
	
	get_all: (req, res, next) => {
		let where = {};
		if (req.query.type) {
			where.type = req.query.type;
		}
		return req.person.getPostalAddresses({
			order: [ 'type' ],
			where
		})
		.then((postalAddresses) => res.json(postalAddresses))
		.catch((err) => next(err));
	},
	
	get_by_id: (req, res, next) => {
		return req.person.getPostalAddresses({
			where: {
				id: req.params.postal_address_id
			}
		})
		.then((postalAddresses) => {
			if (postalAddresses.length === 0) {
				throw { status: 404, message: 'Requested PostalAddress not found' };
			}
			return res.json(postalAddresses[0]);
		})
		.catch((err) => next(err));
	},

	create: (req, res, next) => {
		const data = {
			address: req.body.address || '',
			city: req.body.city || '',
			country: req.body.country || '',
			type: req.body.type || 'home'
		};
		return req.person.createPostalAddress(data)
		.then((postalAddress) => res.json(postalAddress))
		.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return req.person.getPostalAddresses({
			where: {
				id: req.params.postal_address_id
			}
		})
		.then((postalAddresses) => {
			if (postalAddresses.length === 0) {
				throw { status: 404, message: 'Requested PostalAddress not found' };
			}
			Object.assign(postalAddresses[0], req.body);
			return postalAddresses[0].save();
		})
		.then((postalAddress) => res.json(postalAddress))
		.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return req.person.getPostalAddresses({
			where: {
				id: req.params.postal_address_id
			}
		})
		.then((postalAddresses) => {
			if (postalAddresses.length === 0) {
				throw { status: 404, message: 'Requested PostalAddress not found' };
			}
			return postalAddresses[0].destroy();
		})
		.then(() => res.status(200).end())
		.catch((err) => next(err));
	}

};
