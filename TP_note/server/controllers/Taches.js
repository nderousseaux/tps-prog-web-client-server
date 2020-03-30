const
    db = require('../models'),
    Sequelize = require('sequelize');

module.exports = {

    get_all: (req, res, next) => {
        let where = {};
        if (req.query.valeur) {
            where.intitule = {
                [Sequelize.Op.like]: '%'+req.query.intitule+'%'
            };
        }
        return db.Tache.findAll({
            order: [ 'valeur' ],
            where
        })
            .then((taches) => res.json(taches))
            .catch((err) => next(err));
    },

    // load_by_id: (req, res, next) => {
    //     return db.Participant.findByPk(req.params.Participant_id)
    //         .then((Participant) => {
    //             if (!Participant) {
    //                 throw { status: 404, message: 'Requested Participant not found' };
    //             }
    //             req.Participant = Participant;
    //             return next();
    //         })
    //         .catch((err) => next(err));
    // },

    get_by_id: (req, res, next) => {
        return db.Tache.findByPk(req.params.tache_id)
            .then((Tache) => {
                if (!Tache) {
                    throw { status: 404, message: 'Requested Tache not found' };
                }
                return res.json(Tache);
            })
            .catch((err) => next(err));
    },

    create: (req, res, next) => {
        const data = {
            intitule: req.body.intitule || '',
            valeur: req.body.valeur || 1
        };
        return db.Tache.create(data)
            .then((Tache) => res.json(Tache))
            .catch((err) => next(err));
    },

    delete_by_id: (req, res, next) => {
        return db.Tache.findByPk(req.params.tache_id)
            .then((Tache) => {
                if (!Tache) {
                    throw { status: 404, message: 'Requested Tache not found' };
                }
                return Tache.destroy();
            })
            .then(() => res.status(200).end())
            .catch((err) => next(err));
    }

};
