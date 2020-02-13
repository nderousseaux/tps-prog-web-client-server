const
fs = require('fs'),
Sequelize = require('sequelize');

// create Sequelize instance
const sequelize = new Sequelize('w4aNath', 'nderousseaux', 'kt8my67b', {
	host: 'mysql.iutrs.unistra.fr',
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

Object.keys(db).forEach((modelName) => {
	db[modelName].associate(db);
});

sequelize.sync();

module.exports = db;
