const Sequelize = require('sequelize');

module.exports = (sequelize) => {

	class PostalAddress extends Sequelize.Model {
		static associate(db) {
			PostalAddress.belongsTo(db.Person, { onDelete: 'cascade' });
		};
	}

	PostalAddress.init({
		address: Sequelize.STRING,
		city: Sequelize.STRING,
		country: Sequelize.STRING,
		type: Sequelize.ENUM('home', 'work')
	}, {
		sequelize,
		modelName: 'PostalAddress'
	});
	
	return PostalAddress;
};
