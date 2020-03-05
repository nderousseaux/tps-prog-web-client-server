const Sequelize = require('sequelize');

module.exports = (sequelize) => {

	class MailAddress extends Sequelize.Model {
		static associate(db) {
			MailAddress.belongsTo(db.Person, { onDelete: 'cascade' });
		};
	}

	MailAddress.init({
		address: {
			type: Sequelize.STRING,
			validate: {
				isEmail: true
			}
		},
		type: Sequelize.ENUM('home', 'work')
	}, {
		sequelize,
		modelName: 'MailAddress'
	});
	
	return MailAddress;
};
