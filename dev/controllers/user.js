const db = require('../models');
Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const Op = Sequelize.Op;
module.exports = {
	
	get_all: (req, res, next) => {
		if(req.query.username !== undefined){
			return db.User.findAll({
				order: [ 'username' ],
				where: {username: {[Op.like]: req.query.username}}
			})
			.then((user) => res.json(user))
			.catch((err) => next(err));
		}
		else{
			return db.User.findAll({
				order: [ 'username' ]
			})
			.then((user) => res.json(user))
			.catch((err) => next(err));
        }
    },
    get_by_id: (req, res, next) => {
		return db.User.findByPk(req.params.user_id)
		.then((user) => {
			if (!user) {
				throw { status: 404, message: 'Requested User not found' };
			}
			return res.json(user);
		})
		.catch((err) => next(err));
    },
    create: (req, res, next) => {
        
		const data = {
			username: req.body.username,
			password: db.User.generate_hash(req.body.password)
		};
		return db.User.create(data)
		.then((user) => res.json(user))
		.catch((err) => next(err));
    },
    connect: (req, res, next) => {
        return db.User.findOne({
            order: [ 'username' ],
            where: {username: {[Op.like]: req.body.username}}
        })
        .then((user) => {
            if(db.User.check_password(req.body.password, user.password)){
                return [user, jwt.sign({ foo: 'bar' }, user.username)]; 
            }
            else{
                throw { status: 404, message: 'Les informations transmises n\'ont pas permis de vous authentifier '};
            }
        })
		.then((userToken) => res.json(userToken))
		.catch((err) => next(err));
    },
  
		

};
