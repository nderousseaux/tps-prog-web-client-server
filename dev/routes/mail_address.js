const person_ctrl = require('../controllers/person');
const mail_address_ctrl = require('../controllers/mail_address');
const user_ctrl = require('../controllers/user');
const ejwt = require('express-jwt');
module.exports = [
	
	{
		url: '/person/:person_id/mailAddress',
		method: 'get',
		func: [ ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.load_by_id, mail_address_ctrl.get_all ]
	},
	{
		url: '/person/:person_id/mailAddress',
		method: 'post',
		func: [ ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.load_by_id, mail_address_ctrl.create ]
	},
	{
		url: '/person/:person_id/mailAddress/:mail_address_id',
		method: 'get',
		func: [ ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.load_by_id, mail_address_ctrl.get_by_id ]
	},
	{
		url: '/person/:person_id/mailAddress/:mail_address_id',
		method: 'put',
		func: [ ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.load_by_id, mail_address_ctrl.update_by_id ]
	},
	{
		url: '/person/:person_id/mailAddress/:mail_address_id',
		method: 'delete',
		func: [ ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,person_ctrl.load_by_id, mail_address_ctrl.delete_by_id ]
	}
	
];
