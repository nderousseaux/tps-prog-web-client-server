const Sequelize = require('sequelize');

function connectionBDD(dataBase, username, password, host, dialect){
    const sequelize = new Sequelize(dataBase, username, password, {
      host: host,
      dialect: dialect
    });
  
    //On teste la Connection
    sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  
      return sequelize
  }

function PersonModel(sequelize){
    const Model = Sequelize.Model;
    class Person extends Model {}
    Person.init({
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING
    }, { sequelize, modelName: 'Person' });
  
    return Person
}

function MailModel(sequelize){
const Model = Sequelize.Model;
class MailAddress extends Model {}
MailAddress.init({
    address: {
      type: Sequelize.STRING,
      validate: {
          isEmail: true
      }
    },
    type: {
      type: Sequelize.ENUM(['home', 'work'])
    }
}, { sequelize, modelName: 'MailAddress' });

return MailAddress
}

//Connection à la bdd
sequelize = connectionBDD("w4aNath", "nderousseaux", "kt8my67b", 'mysql.iutrs.unistra.fr', "mysql");

//On crée le model
Person = PersonModel(sequelize);
MailAddress = MailModel(sequelize);

MailAddress.belongsTo(Person, {onDelete: 'cascade'});//le mail à un propriétaire
Person.hasMany(MailAddress, {onDelete: 'cascade'});//l'utilisaxteur peux avoir des mail

sequelize.sync();

module.exports = { Person, MailAddress };
