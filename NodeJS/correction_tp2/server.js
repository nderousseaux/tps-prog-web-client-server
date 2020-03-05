const
express = require('express'),
bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json());


// create controllers
const person_ctrl = require('./person_ctrl');
const mail_address_ctrl = require('./mail_address_ctrl');

// register routes
app.get('/person', person_ctrl.get_all);
app.post('/person', person_ctrl.create);
app.get('/person/:person_id', person_ctrl.get_by_id);
app.put('/person/:person_id', person_ctrl.update_by_id);
app.delete('/person/:person_id', person_ctrl.delete_by_id);

app.get('/person/:person_id/mailAddress', person_ctrl.load_by_id, mail_address_ctrl.get_all);
app.post('/person/:person_id/mailAddress', person_ctrl.load_by_id, mail_address_ctrl.create);
app.get('/person/:person_id/mailAddress/:mail_address_id', person_ctrl.load_by_id, mail_address_ctrl.get_by_id);
app.put('/person/:person_id/mailAddress/:mail_address_id', person_ctrl.load_by_id, mail_address_ctrl.update_by_id);
app.delete('/person/:person_id/mailAddress/:mail_address_id', person_ctrl.load_by_id, mail_address_ctrl.delete_by_id);

// register error handling middleware
app.use((err, req, res, next) => {
	if (err.status === undefined) {
		return res.status(500).send(err.message);
	} else {
		return res.status(err.status).send(err.message);
	}
});

// launch server
const server = app.listen(3000, () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});
