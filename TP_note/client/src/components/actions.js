import React, {useEffect, useState} from 'react';


const ActionList = ({actions, removeAction}) => {
    console.log(actions);
    return <ul>
    { actions.map((action, idx) => (
        <li key={idx}>
            {action["participant"].nom} {action["participant"].prenom} à fait "{action["tache"].intitule}" le {action.date.substring(0,10)}
            <button onClick={() => removeAction(action.id)}>Remove</button>

        </li>
    )) }
</ul>};

// const AddActionForm = ({addParticipant}) => {
//     let [currentParticipant, setCurrentParticipant] = useState({
//         nom: '',
//         prenom: ''
//     });
//
//     const handleChange = event => {
//         let newParticipant = {...currentParticipant}
//
//         newParticipant[event.target.name] = event.target.value;
//
//
//         setCurrentParticipant(newParticipant);
//     }
//
//     const handleSubmit = event => {
//         event.preventDefault();
//         addParticipant(currentParticipant);
//         setCurrentParticipant({ // Clear input
//             nom: '',
//             prenom: ''
//         });
//     }
//
//
//     return <form onSubmit={handleSubmit}>
//
//         <input type='text' value={currentParticipant.nom} name='nom' placeholder='Nom' onChange={handleChange} />
//         <input type='text' value={currentParticipant.prenom} name='prenom' placeholder='Prénom' onChange={handleChange} />
//         <input type='submit' value='Ajouter' />
//     </form>;
// };

const Actions = () => {

    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/actions')
        .then(res => res.json())
        .then(data => { //On importe le participant

            data.forEach(action => {
                fetch('http://127.0.0.1:3001/participants/' + action.ParticipantId)
                    .then(res => res.json())
                    .then(participant =>{
                        action["participant"] = participant;
                    })
                    .catch((error)=> {
                        console.log(error.message);
                    });
            })
            return data;

        })
        .then(data => { //On importe la tache

            data.forEach(action => {
                fetch('http://127.0.0.1:3001/taches/' + action.TacheId)
                    .then(res => res.json())
                    .then(tache =>{
                        action["tache"] = tache;
                    })
                    .catch((error)=> {
                        console.log(error.message);
                    });
            })
            return data;

        })
        .then(data =>{
            console.log(data);
            setActions(data);
            setLoading(false);
        })
        .catch((error)=> {
            setLoading(false);
            console.log(error.message);
        });
    }, []);

    // const addParticipant = (participant) =>{
    //     fetch('http://127.0.0.1:3001/participants', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type' : 'application/json'
    //         },
    //         body: JSON.stringify(participant)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         participant.id = data.id;
    //         setParticipants(participants => [participant, ...participants].sort((a, b) => a.nom.localeCompare(b.nom)));
    //     })
    //     .catch(error => {console.log(error.message)})
    //
    // };

    const removeAction = (id) =>{
        fetch('http://127.0.0.1:3001/actions/' + id, {method: 'DELETE'})
        .then(data => {
             setActions(actions.filter(action => action.id !== id));
        })
        .catch(error => {console.log(error.message)})
    };

    return <div>
        <h3>Actions</h3>
        {/*<AddParticipantForm addParticipant={addParticipant} />*/}
        { loading ?
            'Loading...' :
            <ActionList actions={actions} removeAction={removeAction}/>
        }
    </div>
};


export default Actions;