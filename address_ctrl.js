const db = require('./db.js');
const MailAddress = db.MailAddress;

module.exports = {
    get_by_user: (req, res, next) => {  
        return req.person.getMailAddresses()
        .then((mail) => {
            return res.json(mail);
        })
        .catch((err) => next(err));
    },
    create: (req, res, next) => {
        const data = {
            address: req.body.address || '', // use empty string if not defined
            type: req.body.type || '', // use empty string if not defined
        };
        return req.person.createMailAddress(data)
        .then((mail) => res.json(mail))
        .catch((err) => next(err));
    },

    get_by_user_and_id: (req, res, next) => {
        return req.person.getMailAddresses({
            where:{
                id: req.params.mail_address_id
            }
        })
        .then((mailAddresses) => {
            if (mailAddresses.lengh === 0){
                throw { status: 404, message: 'Requested MailAddress not found' };
			}
			Object.assign(mailAddresses[0], req.body);
			return mailAddresses[0].save();
		})
		.then((mailAddress) => res.json(mailAddress))
        .catch((err) => next(err));
    },

    modify: (req, res, next) => {
        return req.person.getMailAddresses({
            where:{
                id: req.params.mail_address_id
            }
        })
        .then((mailAddresses) => {
            if (mailAddresses.lengh === 0){
                throw { status: 404, message: 'Requested MailAddress not found' };
            }
			Object.assign(mailAddresses[0], req.body);
			return mailAddresses[0].save();
		})
		.then((mailAddress) => res.json(mailAddress))
        .catch((err) => next(err));
    },

    delete_by_id: (req, res, next) => {
        return req.person.getMailAddresses({
            where:{
                id: req.params.mail_address_id
            }
        })
        .then((mailAddresses) => {
            if (mailAddresses.lengh === 0){
                throw { status: 404, message: 'Requested MailAddress not found' };
            }
			return mailAddresses[0].destroy();
		})
        .then(() => res.status(200).end())
        .catch((err) => next(err));
    }







}
