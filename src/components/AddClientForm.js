import axios from 'axios'
import config from '../config'
import { useState } from 'react'
// import SelectAction from './SelectAction'
import './AddClientForm.css'
import { useNavigate } from 'react-router-dom'

const AddClientForm = (props) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [nip, setNIP] = useState('')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleChangeNip = (e) => {
        setNIP(e.target.value)
    }

    const saveClient = (eventObj) => {
        console.log(eventObj)
        console.log('saveClient')
        axios.post(config.api.url + '/clients/add', eventObj, { mode: 'cors' })
            .then((res) => {
                console.log(res)
                // props.getClients();
            })
            .catch((err) => {
                console.log(err)
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

        const newClient = {
            name: name,
            address: address,
            NIP: nip
        }

        saveClient(newClient)
        window.alert("Nowa firma została dopisana!")
        resetClientForm()
        navigate('/clients')
    }

    return (
        <div>
            <h2>Dodanie nowego klienta</h2>
            <div className='form-Container'>
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
                        <button type="submit" id="btn-wrapper">Zapisz firmę</button>
                    </div>
                </form>

                <div className="errorWrapper">
                    <ul className="errors"></ul>
                </div>
            </div>
        </div>
    )
}

export default AddClientForm;