const participant_ctrl = require('../controllers/Participants');

module.exports = [

    {
        url: '/participants',
        method: 'get',
        func: participant_ctrl.get_all
    },
    {
        url: '/participants',
        method: 'post',
        func: participant_ctrl.create
    },
    {
        url: '/participants/:participant_id',
        method: 'get',
        func: participant_ctrl.get_by_id
    },
    {
        url: '/participants/:participant_id',
        method: 'delete',
        func: participant_ctrl.delete_by_id
    },

];
