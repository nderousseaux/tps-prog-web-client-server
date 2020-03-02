const user_ctrl = require('../controllers/user');


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
	}
	
];
