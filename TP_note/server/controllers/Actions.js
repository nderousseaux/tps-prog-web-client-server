const
    db = require('../models'),
    Sequelize = require('sequelize');

module.exports = {

    get_all: (req, res, next) => {
        let where = {};

        return db.Action.findAll({
            order: [ 'date' ],
            where
        })

            .then((actions) => res.json(actions))
            .catch((err) => next(err));
    },


    get_by_participant: (req, res, next) => {
        return db.Action.findAll({
            where: {
                ParticipantId: req.Participant.id
            }
        })
            .then((Action) => {
                if (!Action) {
                    throw { status: 404, message: 'Requested Action not found' };
                }
                return res.json(Action);
            })
            .catch((err) => next(err));
    },

    create: (req, res, next) => {
        db.Participant.findByPk(req.params.participant_id)
            .then((Participant) =>{
                if (!Participant) {
                    throw { status: 404, message: 'Requested Participant not found' };
                }
            })
            .catch((err) => next(err));

        db.Tache.findByPk(req.params.tache_id)
            .then((Tache) =>{
                if (!Tache) {
                    throw { status: 404, message: 'Requested Tache not found' };
                }
            })
            .catch((err) => next(err));



        const data = {
            date: req.body.date || "2020-03-30",
            TacheId: req.params.tache_id,
            ParticipantId: req.params.participant_id
        };

        return db.Action.create(data)
            .then((Action) => res.json(Action))
            .catch((err) => next(err));
    },

    delete_by_id: (req, res, next) => {
        return db.Action.findByPk(req.params.action_id)
            .then((Action) => {
                if (!Action) {
                    throw { status: 404, message: 'Requested Action not found' };
                }
                return Action.destroy();
            })
            .then(() => res.status(200).end())
            .catch((err) => next(err));
    }

};
