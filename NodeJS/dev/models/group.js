const Sequelize = require('sequelize');

module.exports = (sequelize) => {

	class Group extends Sequelize.Model {
		static associate(db) {
			Group.belongsTo(db.User, { onDelete: 'cascade' });
		};
	}

	Group.init({
		title: {
			type: Sequelize.STRING
		
		}
	}, {
		sequelize,
		modelName: 'Group'
	});
	
	return Group;
};
