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
                let token = jwt.sign({ id: user.id },
					'salut',
					{ expiresIn: '1h' });
				console.log(token);
				res.setHeader('Authorization', `Bearer ${token}`);
				res.send([token, user]);
				
            }
            else{
                throw { status: 404, message: 'Les informations transmises n\'ont pas permis de vous authentifier '};
            }
        })
		.catch((err) => next(err));
	},
	load_user_req: (req, res, next) => {
		console.log(`req.user: ${req.user}`);
        db.User.findByPk(req.user.id)
        .then(user => {  
            if (!user) { 
                throw {status: 401,message: `Acces  refusé !`
                }
            }    
            req.user = user;
            next();
        })
        .catch(err => next(err));
	},
	update_by_id: (req, res, next) => {
        if (req.user.id != req.params.user_id) {
            throw {status: 401,message: 'Acces  refusé !'
            }
        }
        const data = {
			username: req.body.username,
			password: User.generate_hash(req.body.password)
		};
		User.update(data, {
			where: {
				id: req.params.user_id
			}
		})
		.then(user => {
			if (user == 1) {
				res.send(`Successfully updated user ${req.body.username}`);
			} else {
				throw {
					status: 404,
					message: `User ${req.params.user_id} not found.`
				}
			}	
		})
		.catch(err => next(err));
    },

    delete_by_id: (req, res, next) => {
        if (req.user.id != req.params.user_id) {
            throw {
                status: 401,
                message: 'Access refused'
            }
        }
        User.destroy({
			where: {
				id: req.params.user_id
			}
		})
		.then(() => res.status(200).end())
		.catch(err => next(err));
    }
  
		

};
