const
fs = require('fs'),
Sequelize = require('sequelize');

// create Sequelize instance
const sequelize = new Sequelize('w4a', 'w4a', 'w4aw4aw4a', {
	host: 'mysql.nathanaelderousseaux.fr',
	port: 3306,
	dialect: 'mysql',
	dialectOptions: { decimalNumbers: true }
	// logging: false
});

const db = {};

fs.readdirSync(__dirname)
.filter((filename) => filename !== 'index.js')
.forEach((filename) => {
	const model = require('./' + filename)(sequelize);
	db[model.name] = model;
});

PersonGroup = sequelize.define('PersonGroup', {});
db["Person"].belongsToMany(db["Group"], { through: PersonGroup });
db["Group"].belongsToMany(db["Person"], { through: PersonGroup });

Object.keys(db).forEach((modelName) => {
	db[modelName].associate(db);
});

sequelize.sync();

module.exports = db;
