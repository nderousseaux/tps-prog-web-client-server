const Sequelize = require('sequelize');

module.exports = (sequelize) => {

	class Phone extends Sequelize.Model {
		static associate(db) {
			Phone.belongsTo(db.Person, { onDelete: 'cascade' });
		};
	}

	Phone.init({
		number: Sequelize.STRING,
		type: Sequelize.ENUM('home', 'work')
	}, {
		sequelize,
		modelName: 'Phone'
	});
	
	return Phone;
};
