import React, {useEffect, useState} from 'react';


const PhoneList = ({phones , removePhone}) => {

    return <ul>
        { phones.map((phone, idx) => (
            <li key={idx}>
                {phone.number} | {phone.type} <button onClick={() => removePhone(phone.id)}>Remove</button>
            </li>
        )) }
    </ul>};

const AddPhoneForm = ({addPhone}) => {
    let [currentPhone, setCurrentPhone] = useState({
        number: '',
        type: 'work'
    });

    const handleChange = event => {
        let newPhone = {...currentPhone}

        newPhone[event.target.name] = event.target.value;


        setCurrentPhone(newPhone);
    }

    const handleSubmit = event => {
        event.preventDefault();
        addPhone(currentPhone);
        setCurrentPhone({ // Clear input
            number: '',
            type: 'work'
        });
    }


    return <form onSubmit={handleSubmit}>

        <input type='phone' value={currentPhone.number} name='number' placeholder='Phone' onChange={handleChange} />
        <select value={currentPhone.type} name='type' placeholder='Type' onChange={handleChange}>
            <option>work</option>
            <option>home</option>
        </select>
        <input type='submit' value='Ajouter' />
    </form>;
};

const Phone = ({person}) => {

    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/person/' + person.id + '/phone')
            .then(res => res.json())
            .then(data =>{
                setPhones(data);
                setLoading(false);
            })
            .catch((error)=> {
                setLoading(false);
                console.log(error.message);
            });
    }, []);


    const addPhone = (phone) =>{

        fetch('http://127.0.0.1:3001/person/' + person.id + '/phone', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(phone)
        })
            .then(res => res.json())
            .then(data => {
                phone.id = data.id;
                setPhones(phones => [phone, ...phones].sort((a, b) => a.number.localeCompare(b.number)));
            })
            .catch(error => {console.log(error.message)})

    };

    const removePhone = (idPhone) =>{
        fetch('http://127.0.0.1:3001/person/' + person.id + "/phone/" + idPhone, {method: 'DELETE'})
            .then(data => {
                setPhones(phones.filter(phone => phone.id !== idPhone));
            })
            .catch(error => {console.log(error.message)})
    };

    return <div>
        <h4>Phones</h4>
        <AddPhoneForm addPhone={addPhone} />
        { loading ?
            'Loading...' :
            <PhoneList phones={phones} removePhone={removePhone}/>
        }
    </div>
};

export default Phone;