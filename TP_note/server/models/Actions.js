const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    class Action extends Sequelize.Model {
        static associate(db) {
            Action.belongsTo(db.Tache);
            Action.belongsTo(db.Participant);
        }
    }

    Action.init({
        date: Sequelize.DATEONLY
    }, {
        sequelize,
        modelName: 'Action'
    });

    return Action;

};