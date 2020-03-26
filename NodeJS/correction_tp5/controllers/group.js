const db = require('../models');

module.exports = {
	
	get_all: (req, res, next) => {
		return db.Group.findAll()
		.then((groups) => res.json(groups))
		.catch((err) => next(err));
	},
	
	create: (req, res, next) => {
		const data = {
			title: req.body.title || ''
		};
		return db.Group.create(data)
		.then((group) => res.json(group))
		.catch((err) => next(err));
	},
	
	get_by_id: (req, res, next) => {
		return db.Group.findByPk(req.params.group_id)
		.then((group) => {
			if (!group) {
				throw { status: 404, message: 'Requested Group not found' };
			}
			return res.json(group);
		})
		.catch((err) => next(err));
	},
	
	update_by_id: (req, res, next) => {
		return db.Group.findByPk(req.params.group_id)
		.then((group) => {
			if (!group) {
				throw { status: 404, message: 'Requested Group not found' };
			}
			Object.assign(group, req.body);
			return group.save();
		})
		.then((group) => res.json(group))
		.catch((err) => next(err));
	},
	
	delete_by_id: (req, res, next) => {
		return db.Group.findByPk(req.params.group_id)
		.then((group) => {
			if (!group) {
				throw { status: 404, message: 'Requested Group not found' };
			}
			return group.destroy();
		})
		.then(() => res.status(200).end())
		.catch((err) => next(err));
	},
	
	get_all_of_person: (req, res, next) => {
		return req.person.getGroups()
		.then((groups) => res.json(groups))
		.catch((err) => next(err));
	},
	
	add_to_person: (req, res, next) => {
		return db.Group.findByPk(req.params.group_id)
		.then((group) => {
			if (!group) {
				throw { status: 404, message: 'Requested Group not found' };
			}
			return req.person.addGroup(group);
		})
		.then(() => res.status(200).end())
		.catch((err) => next(err));
	},
	
	remove_from_person: (req, res, next) => {
		return db.Group.findByPk(req.params.group_id)
		.then((group) => {
			if (!group) {
				throw { status: 404, message: 'Requested Group not found' };
			}
			return req.person.removeGroup(group);
		})
		.then(() => res.status(200).end())
		.catch((err) => next(err));
	}

};
