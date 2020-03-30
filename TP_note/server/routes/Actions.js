const action_ctrl = require('../controllers/Actions');
const participant_ctrl = require('../controllers/Participants');

module.exports = [

    {
        url: '/actions',
        method: 'get',
        func: action_ctrl.get_all
    },
    {
        url: '/actions/:participant_id', //Toutes les action du participant
        method: 'get',
        func: [participant_ctrl.load_by_id, action_ctrl.get_by_participant]
    },
    {
        url: '/actions/:tache_id/:participant_id', //
        method: 'post',
        func: action_ctrl.create
    },
    {
        url: '/actions/:action_id',
        method: 'delete',
        func: action_ctrl.delete_by_id
    },

];
