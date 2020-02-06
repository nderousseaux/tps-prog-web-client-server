const Sequelize = require('sequelize');

// create Sequelize instance
const sequelize = new Sequelize('w4a', 'w4a', 'w4aw4aw4a', {
	host: 'localhost',
	port: 3306,
	dialect: 'mysql',
	dialectOptions: { decimalNumbers: true }
	// logging: false
});


// create models

class Person extends Sequelize.Model { }

Person.init({
	lastname: Sequelize.STRING,
	firstname: Sequelize.STRING
}, {
	sequelize,
	modelName: 'Person'
});

class MailAddress extends Sequelize.Model { }

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

// configure relations
Person.hasMany(MailAddress, { onDelete: 'cascade' });
MailAddress.belongsTo(Person, { onDelete: 'cascade' });

// sync DB
sequelize.sync();

module.exports = {
	Person,
	MailAddress
};
