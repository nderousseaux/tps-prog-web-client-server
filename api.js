const personCtrl = require('./person_ctrl.js');
const addressCtrl = require('./address_ctrl.js');
//On fait les includes
const bodyParser = require('body-parser');
const express = require('express');

function serveur(bodyParser){
  const app = express();
  app.use(bodyParser.json());
  return app;
}

function routes(app) {

  app.get('/person', personCtrl.get_all);
  app.post('/person', personCtrl.create);
  app.get('/person/:person_id', personCtrl.get_by_id);
  app.put('/person/:person_id', personCtrl.update_by_id);
  app.delete('/person/:person_id', personCtrl.delete_by_id);


  app.get('/person/:person_id/mailAddress', personCtrl.load_by_id, addressCtrl.get_by_user);
  app.post('/person/:person_id/mailAddress',personCtrl.load_by_id,  addressCtrl.create);
  app.get('/person/:person_id/mailAddress/:mail_address_id', personCtrl.load_by_id,  addressCtrl.get_by_user_and_id)
  app.put('/person/:person_id/mailAddress/:mail_address_id', personCtrl.load_by_id, addressCtrl.modify);
  app.delete('/person/:person_id/mailAddress/:mail_address_id', personCtrl.load_by_id, addressCtrl.delete_by_id);
}


//On crée le serveur
const app = serveur(bodyParser);

//On définit les routes
routes(app);


app.use((err, req, res, next) => {
  if (err.status === undefined) {
    return res.status(500).send(err.message);
  } else {
    return res.status(err.status).send(err.message);
  }
});

//On lance le serveur
app.listen(3000);
