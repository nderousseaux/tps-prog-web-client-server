const db = require('../models');
Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
	
	get_all: (req, res, next) => {
		if(req.query.type !== undefined){
			return req.person.getPostalAddresses({
				order: [ 'type' ],
				where: {type: {[Op.like]: req.query.type}}
			})
			.then((postalAddresses) => res.json(postalAddresses))
			.catch((err) => next(err));
		}
		else{
			return req.person.getPostalAddresses({
				order: [ 'type' ],
			})
			.then((postalAddresses) => res.json(postalAddresses))
			.catch((err) => next(err));
		}
	},
	
	get_by_id: (req, res, next) => {
		return req.person.getPostalAddresses({
			where: {
				id: req.params.postal_address_id
			}
		})
		.then((postalAddresses) => {
			if (postalAddresses.length === 0) {
				throw { status: 404, message: 'Requested PhoneAddress not found' };
			}
			return res.json(postalAddresses[0]);
		})
		.catch((err) => next(err));
	},

	create: (req, res, next) => {
		const data = {
			address: req.body.address || '',
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
				throw { status: 404, message: 'Requested PhoneAddress not found' };
			}
			Object.assign(postalAddresses[0], req.body);
			return postalAddresses[0].save();
		})
		.then((postalAddress) => res.json(postalAddress))
		.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return req.person.getPhoneAddresses({
			where: {
				id: req.params.postal_address_id
			}
		})
		.then((postalAddresses) => {
			if (postalAddresses.length === 0) {
				throw { status: 404, message: 'Requested PhoneAddress not found' };
			}
			return postalAddresses[0].destroy();
		})
		.then(() => res.status(200).end())
		.catch((err) => next(err));
	}

};
