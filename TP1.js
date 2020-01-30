//On fait les includes
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const express = require('express');


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
  }, { sequelize, modelName: 'person' });

  sequelize.sync()
  return Person
}
function serveur(bodyParser){
  const app = express();
  app.use(bodyParser.json());


  return app;
}
function routes(serveur) {

  //Afficher tout le monde
  app.get('/person', (req, res) => {
      Person.findAll().then(person => res.json(person))
  })

  //Créer une personne
  app.post('/person', (req, res) => {
    Person.create(req.body).then(res.send("Personne correctement créée !"));
  })

  //Sélectionner une personne
  app.get('/person/:personId', function (req, res) {
    Person.findByPk(req.params.personId).then(person => res.json(person))
  })

  //Modifier une personne
  app.put('/person/:personId', function (req, res) {
      Person.update(req.body, {
        where : {
          id: req.params.personId
        }
      });
  })

  //Supprimer une personne
  app.delete('/person/:personId', function (req, res) {
      Person.destroy({
        where : {
          id: req.params.personId
        }
      });
  })

}


//Connection à la bdd
sequelize = connectionBDD("w4aNath", "nderousseaux", "kt8my67b", 'mysql.iutrs.unistra.fr', "mysql");

//On crée le model
Person = PersonModel(sequelize);

//On crée le serveur
app = serveur(bodyParser);

//On définit les routes
routes(app);

//On lance le serveur
app.listen(3000);
