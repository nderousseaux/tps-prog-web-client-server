const db = require('../models');
Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
	
	get_all: (req, res, next) => {
		if(req.query.type !== undefined){
			return req.person.getMailAddresses({
				order: [ 'type' ],
				where: {type: {[Op.like]: req.query.type}}
			})
			.then((mailAddresses) => res.json(mailAddresses))
			.catch((err) => next(err));
		}
		else{
			return req.person.getMailAddresses({
				order: [ 'type' ],
			})
			.then((mailAddresses) => res.json(mailAddresses))
			.catch((err) => next(err));
		}
	
	},
	
	get_by_id: (req, res, next) => {
		return req.person.getMailAddresses({
			where: {
				id: req.params.mail_address_id
			}
		})
		.then((mailAddresses) => {
			if (mailAddresses.length === 0) {
				throw { status: 404, message: 'Requested MailAddress not found' };
			}
			return res.json(mailAddresses[0]);
		})
		.catch((err) => next(err));
	},

	create: (req, res, next) => {
		const data = {
			address: req.body.address || '',
			type: req.body.type || 'home'
		};
		return req.person.createMailAddress(data)
		.then((mailAddress) => res.json(mailAddress))
		.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return req.person.getMailAddresses({
			where: {
				id: req.params.mail_address_id
			}
		})
		.then((mailAddresses) => {
			if (mailAddresses.length === 0) {
				throw { status: 404, message: 'Requested MailAddress not found' };
			}
			Object.assign(mailAddresses[0], req.body);
			return mailAddresses[0].save();
		})
		.then((mailAddress) => res.json(mailAddress))
		.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return req.person.getMailAddresses({
			where: {
				id: req.params.mail_address_id
			}
		})
		.then((mailAddresses) => {
			if (mailAddresses.length === 0) {
				throw { status: 404, message: 'Requested MailAddress not found' };
			}
			return mailAddresses[0].destroy();
		})
		.then(() => res.status(200).end())
		.catch((err) => next(err));
	}

};
