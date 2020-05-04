import React, {useEffect, useState} from 'react';
import Phone from './people/phone.js';
import Mail from './people/mail.js';


const PeopleList = ({people, removePerson}) => {
    const [detail, setDetail] = useState([true]);

    return <ul>
    { people.map((person, idx) => (
        <li key={idx}>
            {person.firstname} {person.lastname}
            <button onClick={() => removePerson(person.id)}>Remove</button>
            <button onClick={() => setDetail(!detail)}>Détails</button>
            { detail ?
                '' :
                <Mail person={person} />
            }
            { detail ?
                '' :
                <Phone person={person} />
            }
        </li>
    )) }
</ul>};

const AddPersonForm = ({addPerson}) => {
    let [currentPerson, setCurrentPerson] = useState({
        firstname: '',
        lastname: ''
    });

    const handleChange = event => {
        let newPerson = {...currentPerson}

        newPerson[event.target.name] = event.target.value;


        setCurrentPerson(newPerson);
    }

    const handleSubmit = event => {
        event.preventDefault();
        addPerson(currentPerson);
        setCurrentPerson({ // Clear input
            firstname: '',
            lastname: ''
        });
    }


    return <form onSubmit={handleSubmit}>

        <input type='text' value={currentPerson.firstname} name='firstname' placeholder='Prénom' onChange={handleChange} />
        <input type='text' value={currentPerson.lastname} name='lastname' placeholder='Nom' onChange={handleChange} />
        <input type='submit' value='Ajouter' />
    </form>;
};

const People = () => {

    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/person')
        .then(res => res.json())
        .then(data =>{
            setPeople(data);
            setLoading(false);
        })
        .catch((error)=> {
            setLoading(false);
            console.log(error.message);
        });
    }, []);

    const addPerson = (person) =>{
        fetch('http://127.0.0.1:3001/person', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(person)
        })
        .then(res => res.json())
        .then(data => {
            person.id = data.id;
            setPeople(people => [person, ...people].sort((a, b) => a.firstname.localeCompare(b.firstname)));
        })
        .catch(error => {console.log(error.message)})

        console.log(person);
    };

    const removePerson = (id) =>{
        fetch('http://127.0.0.1:3001/person/' + id, {method: 'DELETE'})
        .then(data => {
             setPeople(people.filter(person => person.id !== id));
        })
        .catch(error => {console.log(error.message)})
    };

    return <div>
        <h3>People</h3>
        <AddPersonForm addPerson={addPerson} />
        { loading ?
            'Loading...' :
            <PeopleList people={people} removePerson={removePerson}/>
        }
    </div>
};


export default People;