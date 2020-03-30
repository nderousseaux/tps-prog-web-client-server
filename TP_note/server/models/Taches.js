const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    class Tache extends Sequelize.Model {
        static associate(db) {
            Tache.hasMany(db.Action, { onDelete: 'cascade' });
        }
    }

    Tache.init({
        intitule: Sequelize.STRING,
        valeur: Sequelize.INTEGER
    }, {
        sequelize,
        modelName: 'Tache'
    });

    return Tache;

};