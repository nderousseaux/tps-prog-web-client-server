const tache_ctrl = require('../controllers/taches');

module.exports = [

    {
        url: '/taches',
        method: 'get',
        func: tache_ctrl.get_all
    },
    {
        url: '/taches',
        method: 'post',
        func: tache_ctrl.create
    },
    {
        url: '/taches/:tache_id',
        method: 'get',
        func: tache_ctrl.get_by_id
    },
    {
        url: '/taches/:tache_id',
        method: 'delete',
        func: tache_ctrl.delete_by_id
    },

];
