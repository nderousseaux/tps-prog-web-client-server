import React, {useEffect, useState} from 'react';


const TachesList = ({taches, removeTache}) => {
    return <ul>
    { taches.map((tache, idx) => (
        <li key={idx}>
            {tache.intitule} - {tache.valeur} point(s)
            <button onClick={() => removeTache(tache.id)}>Remove</button>

        </li>
    )) }
</ul>};

const AddTacheForm = ({addTache}) => {
    let [currentTache, setCurrentTache] = useState({
        intitule: '',
        valeur: 1
    });

    const handleChange = event => {
        let newTache = {...currentTache}

        newTache[event.target.name] = event.target.value;


        setCurrentTache(newTache);
    }

    const handleSubmit = event => {
        event.preventDefault();
        addTache(currentTache);
        setCurrentTache({ // Clear input
            intitule: '',
            valeur: 1
        });
    }


    return <form onSubmit={handleSubmit}>

        <input type='text' value={currentTache.intitule} name='intitule' placeholder='Intitule' onChange={handleChange} />
        Valeur<input type='number' value={currentTache.valeur} name='valeur' onChange={handleChange} />
        <input type='submit' value='Ajouter' />
    </form>;
};

const Taches = () => {

    const [taches, setTaches] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/taches')
        .then(res => res.json())
        .then(data =>{
            setTaches(data);
            setLoading(false);
        })
        .catch((error)=> {
            setLoading(false);
            console.log(error.message);
        });
    }, []);

    const addTache = (tache) =>{
        fetch('http://127.0.0.1:3001/taches', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(tache)
        })
        .then(res => res.json())
        .then(data => {
            tache.id = data.id;
            setTaches(taches => [tache, ...taches].sort((a, b) => a.intitule.localeCompare(b.intitule)));
        })
        .catch(error => {console.log(error.message)})

    };

    const removeTache = (id) =>{
        fetch('http://127.0.0.1:3001/taches/' + id, {method: 'DELETE'})
        .then(data => {
             setTaches(taches.filter(tache => tache.id !== id));
        })
        .catch(error => {console.log(error.message)})
    };

    return <div>
        <h3>Taches</h3>
        <AddTacheForm addTache={addTache} />
        { loading ?
            'Loading...' :
            <TachesList taches={taches} removeTache={removeTache}/>
        }
    </div>
};


export default Taches;