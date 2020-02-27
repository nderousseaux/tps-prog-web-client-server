const Sequelize = require('sequelize');

module.exports = (sequelize) => {

	class Group extends Sequelize.Model {
		static associate(db) {
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
