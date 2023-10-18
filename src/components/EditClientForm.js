import axios from 'axios'
import config from '../config'
import { useEffect, useState } from 'react'
// import SelectAction from './SelectAction'
import './AddClientForm.css'
import { useNavigate, useParams } from 'react-router-dom'

const EditClientForm = (props) => {

    const navigate = useNavigate();
    const {clientId} = useParams();
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [nip, setNIP] = useState('')
    const [errors, setErrors] = useState([])
    
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
        // props.getClients();

        console.log(eventObj)
        console.log('updateClient')
        axios.put(config.api.url + '/clients/edit/'+clientId, eventObj, {mode: 'cors'})
        .then((res) => {
            console.log(res)
            navigate('/clients')
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

        const editedClient = {
            name: name,
            address: address,
            NIP: nip
        }
    
        updateClient(editedClient)
        resetClientForm()
    }

    return (
        <div>
            <h2>Edycja klienta</h2>
            <form action="#" onSubmit={validateClientForm}>
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
                    <button type="submit" id="btn-wrapper">Zaktualizuj dane</button>
                </div>
            </form>

            <div className="errorWrapper">
                <ul className="errors"></ul>
            </div>
        </div>
    )
}

export default EditClientForm;