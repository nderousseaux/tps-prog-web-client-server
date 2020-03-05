const person_ctrl = require('../controllers/person');
const phone_ctrl = require('../controllers/phone');
const user_ctrl = require('../controllers/user');
const ejwt = require('express-jwt');
module.exports = [
	
	{
		url: '/person/:person_id/phone',
		method: 'get',
		func: [ ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.load_by_id, phone_ctrl.get_all ]
	},
	{
		url: '/person/:person_id/phone',
		method: 'post',
		func: [ejwt({secret: 'salut'}),
		user_ctrl.load_user_req, person_ctrl.load_by_id, phone_ctrl.create ]
	},
	{
		url: '/person/:person_id/phone/:phone_id',
		method: 'get',
		func: [ ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.load_by_id, phone_ctrl.get_by_id ]
	},
	{
		url: '/person/:person_id/phone/:phone_id',
		method: 'put',
		func: [ ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.load_by_id, phone_ctrl.update_by_id ]
	},
	{
		url: '/person/:person_id/phone/phone_id',
		method: 'delete',
		func: [ ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.load_by_id, phone_ctrl.delete_by_id ]
	}
	
];
