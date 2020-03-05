const Sequelize = require('sequelize');

module.exports = (sequelize) => {

	class PostalAddress extends Sequelize.Model {
		static associate(db) {
			PostalAddress.belongsTo(db.Person, { onDelete: 'cascade' });
		};
	}

	PostalAddress.init({
		address: {
			type: Sequelize.STRING,
		},
		type: Sequelize.ENUM('home', 'work')
	}, {
		sequelize,
		modelName: 'PostalAddress'
	});
	
	return PostalAddress;
};
