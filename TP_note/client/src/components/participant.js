import React, {useEffect, useState} from 'react';


const ParticipantList = ({participants, removeParticipant}) => {
    return <ul>
    { participants.map((participant, idx) => (
        <li key={idx}>
            {participant.nom} {participant.prenom}
            <button onClick={() => removeParticipant(participant.id)}>Remove</button>

        </li>
    )) }
</ul>};

const AddParticipantForm = ({addParticipant}) => {
    let [currentParticipant, setCurrentParticipant] = useState({
        nom: '',
        prenom: ''
    });

    const handleChange = event => {
        let newParticipant = {...currentParticipant}

        newParticipant[event.target.name] = event.target.value;


        setCurrentParticipant(newParticipant);
    }

    const handleSubmit = event => {
        event.preventDefault();
        addParticipant(currentParticipant);
        setCurrentParticipant({ // Clear input
            nom: '',
            prenom: ''
        });
    }


    return <form onSubmit={handleSubmit}>

        <input type='text' value={currentParticipant.nom} name='nom' placeholder='Nom' onChange={handleChange} />
        <input type='text' value={currentParticipant.prenom} name='prenom' placeholder='Prénom' onChange={handleChange} />
        <input type='submit' value='Ajouter' />
    </form>;
};

const Participant = () => {

    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/participants')
        .then(res => res.json())
        .then(data =>{
            setParticipants(data);
            setLoading(false);
        })
        .catch((error)=> {
            setLoading(false);
            console.log(error.message);
        });
    }, []);

    const addParticipant = (participant) =>{
        fetch('http://127.0.0.1:3001/participants', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(participant)
        })
        .then(res => res.json())
        .then(data => {
            participant.id = data.id;
            setParticipants(participants => [participant, ...participants].sort((a, b) => a.nom.localeCompare(b.nom)));
        })
        .catch(error => {console.log(error.message)})

    };

    const removeParticipant = (id) =>{
        fetch('http://127.0.0.1:3001/participants/' + id, {method: 'DELETE'})
        .then(data => {
             setParticipants(participants.filter(particpant => particpant.id !== id));
        })
        .catch(error => {console.log(error.message)})
    };

    return <div>
        <h3>Participants</h3>
        <AddParticipantForm addParticipant={addParticipant} />
        { loading ?
            'Loading...' :
            <ParticipantList participants={participants} removeParticipant={removeParticipant}/>
        }
    </div>
};


export default Participant;