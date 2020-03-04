const person_ctrl = require('../controllers/person');
const user_ctrl = require('../controllers/user');
const ejwt = require('express-jwt');
module.exports = [
	
	{
		url: '/person',
		method: 'get',
		func: [ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.get_all]
	},
	{
		url: '/person',
		method: 'post',
		func: [ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.create]
	},
	{
		url: '/person/:person_id',
		method: 'get',
		func: [ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.get_by_id]
	},
	{
		url: '/person/:person_id',
		method: 'put',
		func: [ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.update_by_id]
	},
	{
		url: '/person/:person_id',
		method: 'delete',
		func: [ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.delete_by_id]
	}
	
];
