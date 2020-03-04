const user_ctrl = require('../controllers/user');
const ejwt = require('express-jwt');

module.exports = [
	
    {
		url: '/user',
		method: 'get',
		func: user_ctrl.get_all
    },
    {
		url: '/user/:user_id',
		method: 'get',
		func: user_ctrl.get_by_id
    },
    {
		url: '/user/signup',
		method: 'post',
		func: user_ctrl.create
    },
    {
		url: '/user/signin',
		method: 'post',
		func: user_ctrl.connect
	},
	{
        url: '/user/:user_id',
        method: 'put',
        func: [
            ejwt({secret: 'salut'}),
            user_ctrl.load_user_req,
            user_ctrl.update_by_id
        ]
    },
    {
        url: '/user/:user_id',
        method: 'delete',
        func: [
            ejwt({secret: 'salut'}),
            user_ctrl.load_user_req,
            user_ctrl.delete_by_id
        ]
    }
	
];
