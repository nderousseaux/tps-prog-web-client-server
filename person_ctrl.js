const db = require('./db.js');
const Person = db.Person;

module.exports = {
    get_all: (req, res, next) => {
        return Person.findAll({
            order: ['lastname'] // sort results by lastname
        })
        .then((people) => res.json(people))
        .catch((err) => next(err));
    },

    get_by_id: (req, res, next) => {  
        return Person.findByPk(req.params.person_id)
        .then((person) => {
            if (!person) {
                throw { status: 404, message: 'Requested Person not found' };
            }
            return res.json(person);
        })
        .catch((err) => next(err));
    },

    load_by_id: (req, res, next) => {  
        return Person.findByPk(req.params.person_id)
        .then((person) => {
            if (!person) {
                throw { status: 404, message: 'Requested Person not found' };
            }
            req.person = person;
            next();
        })
        .catch((err) => next(err));
    },

    create: (req, res, next) => {
        const data = {
            firstname: req.body.firstname || '', // use empty string if not defined
            lastname: req.body.lastname || '' // use empty string if not defined
        };
        return Person.create(data)
        .then((person) => res.json(person))
        .catch((err) => next(err));
    },

    update_by_id: (req, res, next) => {
        return Person.findByPk(req.params.person_id)
        .then((person) => {
            if (!person) {
                throw { status: 404, message: 'Requested Person not found' };
            }
            Object.assign(person, req.body);
            return person.save();
        })
        .then((person) => res.json(person))
        .catch((err) => next(err));
    },

    delete_by_id: (req, res, next) => {
        return Person.findByPk(req.params.person_id)
        .then((person) => {
            if (!person) {
                throw { status: 404, message: 'Requested Person not found' };
            }
            return person.destroy();
        })
        .then(() => res.status(200).end())
        .catch((err) => next(err));
    }

}
