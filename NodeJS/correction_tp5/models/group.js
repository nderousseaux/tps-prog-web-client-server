const Sequelize = require('sequelize');

module.exports = (sequelize) => {

	class Group extends Sequelize.Model {
		static associate(db) {
			Group.belongsToMany(db.Person, { through: 'PersonGroup' });
		};
	}

	Group.init({
		title: Sequelize.STRING
	}, {
		sequelize,
		modelName: 'Group'
	});
	
	return Group;
};
