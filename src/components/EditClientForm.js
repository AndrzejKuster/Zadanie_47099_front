import axios from 'axios'
import config from '../config'
import { useEffect, useState } from 'react'
// import SelectAction from './SelectAction'
import './AddClientForm.css'
import './EditClientForm.css'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditClientForm = () => {

    const navigate = useNavigate();
    const { clientId } = useParams();
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [nip, setNIP] = useState('')
    const [errors, setErrors] = useState([])
    const [clientActions, setClientActions] = useState([])


    useEffect(() => {
        axios.get(config.api.url + `/clients/findone/${clientId}`)
            .then(response => {
                const clientData = response.data;
                console.log(clientData);
                setName(clientData.name);
                setAddress(clientData.address);
                setNIP(clientData.NIP);
            })
            .catch(error => {
                console.error(error);
            });
    }, [clientId]);


    useEffect(() => {
        if (clientId) {
            showActions();
        }
        console.log("useEffect clientId: ", clientId);
    }, [clientId])

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleChangeNip = (e) => {
        setNIP(e.target.value)
    }

    const updateClient = (eventObj) => {
        axios.put(config.api.url + '/clients/edit/' + clientId, eventObj, { mode: 'cors' })
            .then((res) => {
                navigate('/clients')
            })
            .catch((err) => {
                console.log(err)
                window.alert("AKtualizacja nie powiodła się!")
            })
    }

    const resetClientForm = () => {
        setName('');
        setAddress('');
        setNIP('');
        setErrors([]);
    }

    const validateClientForm = (e) => {
        e.preventDefault()

        const editedClient = {
            name: name,
            address: address,
            NIP: nip
        }

        updateClient(editedClient)
        window.alert('Klient został pomyślnie zaktualizowany!');
        resetClientForm()
    }

    const showActions = () => {
        axios
            .get(config.api.url + '/actions/clients/' + clientId + '/actions')
            .then((res) => {
                setClientActions(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <h2>Edycja klienta</h2>
            <div className='formContainer'>
                <form onSubmit={validateClientForm}>
                    <div className="wrapper">
                        <label htmlFor="name">Nazwa firmy: </label>
                        <input type="text" id="name" value={name} onChange={handleChangeName} />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="address">Adres firmy: </label>
                        <input type="text" id="address" value={address} onChange={handleChangeAddress} />
                    </div>
                    <div className="wrapper">
                        <label htmlFor="nip">NIP: </label>
                        <input type="text" id="nip" value={nip} onChange={handleChangeNip} />
                    </div>
                    <div className="btn-wrapper">
                        <button type="submit" id="btn-wrapper">Zaktualizuj dane jesli potrzeba</button>
                    </div>
                </form>
            </div>
            <div className="errorWrapper">
                <ul className="errors"></ul>
            </div>

            <div>
                <h2>Historia zdarzeń</h2>
                <div className="btn-add-action">
                    <Link to={`actions/add`} >
                        <button type="submit" id="btn-add-action">Dodaj nowe zdarzenie</button>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>data kontaktu</th>
                            <th>rodzaj akcji</th>
                            <th>dodatkowy opis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientActions.map((action) => (
                            <tr key={action._id}>
                                <td>{action.date.slice(0, 10)}</td>
                                <td>{action.actionType.val}</td>
                                <td>{action.description}</td>

                            </tr>
                        )
                        )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EditClientForm;