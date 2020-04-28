import React, {useEffect, useState} from 'react';

const MailList = ({mails , removeMail}) => {

    return <ul>
        { mails.map((mail, idx) => (
            <li key={idx}>
                {mail.address} | {mail.type} <button onClick={() => removeMail(mail.id)}>Remove</button>
            </li>
        )) }
    </ul>};

const AddMailForm = ({addMail}) => {
    let [currentMail, setCurrentMail] = useState({
        address: '',
        type: 'work'
    });

    const handleChange = event => {
        let newMail = {...currentMail}

        newMail[event.target.name] = event.target.value;


        setCurrentMail(newMail);
    }

    const handleSubmit = event => {
        event.preventDefault();
        addMail(currentMail);
        setCurrentMail({ // Clear input
            address: '',
            type: 'work'
        });
    }


    return <form onSubmit={handleSubmit}>

        <input type='email' value={currentMail.address} name='address' placeholder='Adresse' onChange={handleChange} />
        <select value={currentMail.type} name='type' placeholder='Type' onChange={handleChange}>
            <option>work</option>
            <option>home</option>
        </select>
        <input type='submit' value='Ajouter' />
    </form>;
};

const Mail = ({person}) => {

    const [mails, setMails] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/person/' + person.id + '/mailAddress')
            .then(res => res.json())
            .then(data =>{
                setMails(data);
                setLoading(false);
            })
            .catch((error)=> {
                setLoading(false);
                console.log(error.message);
            });
    }, []);


    const addMail = (mail) =>{

        console.log(JSON.stringify(mail));
        fetch('http://127.0.0.1:3001/person/' + person.id + '/mailAddress', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(mail)
        })
            .then(res => res.json())
            .then(data => {
                mail.id = data.id;
                setMails(mails => [mail, ...mails].sort((a, b) => a.address.localeCompare(b.address)));
            })
            .catch(error => {console.log(error.message)})

    };

    const removeMail = (idMail) =>{
        fetch('http://127.0.0.1:3001/person/' + person.id + "/mailAddress/" + idMail, {method: 'DELETE'})
            .then(data => {
                setMails(mails.filter(mail => mail.id !== idMail));
            })
            .catch(error => {console.log(error.message)})
    };

    return <div>
        <h4>Mails</h4>
        <AddMailForm addMail={addMail} />
        { loading ?
            'Loading...' :
            <MailList mails={mails} removeMail={removeMail}/>
        }
    </div>
};

export default Mail;