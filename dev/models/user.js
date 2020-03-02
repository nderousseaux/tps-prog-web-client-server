const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
	
	class User extends Sequelize.Model {
		static associate(db) {
			User.hasMany(db.Person, { onDelete: 'cascade' });
			User.hasMany(db.Group, { onDelete: 'cascade' });
		}

		static generate_hash(hash){
			return bcrypt.hashSync(hash, 10);
		}


		static check_password(password, hash){
			return bcrypt.compareSync(password, hash);
		}

		toJSON(){
			var values = Object.assign({}, this.get());
			delete values.password;
			return values;
		  }
	}

	User.init({
		username: {type: Sequelize.STRING, allowNull: false, unique: true},
		password: {type: Sequelize.STRING, allowNull: false}
	}, {
		sequelize,
		modelName: 'User'
	});

	return User;

};
