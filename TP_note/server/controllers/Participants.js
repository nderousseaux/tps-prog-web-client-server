const
    db = require('../models'),
    Sequelize = require('sequelize');

module.exports = {

    get_all: (req, res, next) => {
        let where = {};
        if (req.query.nom) {
            where.prenom = {
                [Sequelize.Op.like]: '%'+req.query.nom+'%'
            };
        }
        return db.Participant.findAll({
            order: [ 'nom' ],
            where
        })
            .then((participants) => res.json(participants))
            .catch((err) => next(err));
    },

    load_by_id: (req, res, next) => {
        console.log("aa");
        return db.Participant.findByPk(req.params.participant_id)
            .then((Participant) => {
                if (!Participant) {
                    throw { status: 404, message: 'Requested Participant not found' };
                }
                req.Participant = Participant;
                return next();
            })
            .catch((err) => next(err));
    },

    get_by_id: (req, res, next) => {
        return db.Participant.findByPk(req.params.participant_id)
            .then((Participant) => {
                if (!Participant) {
                    throw { status: 404, message: 'Requested Participant not found' };
                }
                return res.json(Participant);
            })
            .catch((err) => next(err));
    },

    create: (req, res, next) => {
        const data = {
            nom: req.body.nom || '',
            prenom: req.body.prenom || ''
        };
        return db.Participant.create(data)
            .then((Participant) => res.json(Participant))
            .catch((err) => next(err));
    },

    delete_by_id: (req, res, next) => {
        return db.Participant.findByPk(req.params.participant_id)
            .then((Participant) => {
                if (!Participant) {
                    throw { status: 404, message: 'Requested Participant not found' };
                }
                return Participant.destroy();
            })
            .then(() => res.status(200).end())
            .catch((err) => next(err));
    }

};
