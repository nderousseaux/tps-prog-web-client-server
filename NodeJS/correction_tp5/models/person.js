const Sequelize = require('sequelize');

module.exports = (sequelize) => {
	
	class Person extends Sequelize.Model {
		static associate(db) {
			Person.hasMany(db.MailAddress, { onDelete: 'cascade' });
			Person.hasMany(db.Phone, { onDelete: 'cascade' });
			Person.hasMany(db.PostalAddress, { onDelete: 'cascade' });
			Person.belongsToMany(db.Group, { through: 'PersonGroup' });
		}
	}

	Person.init({
		lastname: Sequelize.STRING,
		firstname: Sequelize.STRING
	}, {
		sequelize,
		modelName: 'Person'
	});
	
	return Person;

};
