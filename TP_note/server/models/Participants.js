const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    class Participant extends Sequelize.Model {
        static associate(db) {
            Participant.hasMany(db.Action, { onDelete: 'cascade' });
        }
    }

    Participant.init({
        prenom: Sequelize.STRING,
        nom: Sequelize.STRING
    }, {
        sequelize,
        modelName: 'Participant'
    });

    return Participant;

};