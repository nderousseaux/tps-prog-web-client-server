const person_ctrl = require('../controllers/person');
const group_ctrl = require('../controllers/group');
const user_ctrl = require('../controllers/user');
const ejwt = require('express-jwt');

module.exports = [
	
	{
		url: '/group',
		method: 'get',
		func: [ 
			ejwt({secret: 'salut'}),
			user_ctrl.load_user_req,
			group_ctrl.get_all ]
	},
	{
		url: '/group',
		method: 'post',
		func: [ ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,
		group_ctrl.create ]
	},
	{
	 	url: '/group/:group_id',
	 	method: 'get',
	 	func: [ ejwt({secret: 'salut'}),
		 user_ctrl.load_user_req,group_ctrl.get_by_id]
	},
	{
		url: '/group/:group_id',
		method: 'put',
		func: [ ejwt({secret: 'salut'}),
		user_ctrl.load_user_req,group_ctrl.update_by_id]
   },
   {
	url: '/group/:group_id',
	method: 'delete',
	func: [ ejwt({secret: 'salut'}),
	user_ctrl.load_user_req,group_ctrl.delete_by_id]
	},
	{
	url: '/person/:person_id/group',
	method: 'get',
	func: [ ejwt({secret: 'salut'}),
	user_ctrl.load_user_req,person_ctrl.load_by_id, group_ctrl.get_group_by_person ]
	},
	{
	url: '/group/:group_id/person',
	method: 'get',
	func: [ ejwt({secret: 'salut'}),
	user_ctrl.load_user_req,group_ctrl.load_by_id, person_ctrl.get_person_by_group]
	},
	{ 
	url: '/person/:person_id/group/:group_id',
	method: 'post',
	func : [ejwt({secret: 'salut'}),
	user_ctrl.load_user_req,group_ctrl.load_by_id, person_ctrl.add_group]
	},
	{ 
	url: '/group/:group_id/person/:person_id',
	method: 'post',
	func : [ejwt({secret: 'salut'}),
	user_ctrl.load_user_req,group_ctrl.load_by_id, person_ctrl.add_group]
	},
	{ 
	url: '/person/:person_id/group/:group_id',
	method: 'delete',
	func : [ejwt({secret: 'salut'}),
	user_ctrl.load_user_req,group_ctrl.load_by_id, person_ctrl.del_group]
	},
	{ 
	url: '/group/:group_id/person/:person_id',
	method: 'delete',
	func : [ejwt({secret: 'salut'}),
	user_ctrl.load_user_req,group_ctrl.load_by_id, person_ctrl.del_group]
	}
	
];
