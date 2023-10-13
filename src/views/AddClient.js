import { useEffect, useState } from 'react'
import AddClientForm from '../components/AddClientForm'
import ClientsTable from '../components/ClientsTable'
import axios from 'axios'
import config from '../config'

const AddClient = () => {

    const [clients, setClients] = useState([])

    useEffect(() => {
        getClients()
    }, [])

    const getClients = () => {
        axios
            .get(config.api.url + '/clients')
            .then((res) => {
                console.log('odczyt z funkcji getClients: ', res.data);
                setClients(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const deleteClient = (rowId) => {
        console.log(rowId);
        if (window.confirm('Czy na pewno usunąć firmę?')) {
          console.log('jestem w if');
          axios
            .delete((config.api.url + '/clients/delete/' + rowId))
            .then((res) => {
              console.log(res);
              if (res.data.deleted) {
                console.log('deleteClient, zaraz pobiorę nową listę klientów');
                getClients()
              }
            })
            .catch((err) => {
              console.error(err)
            })
        }
      }

    return (
        <div>
            <div className='formContainer'>
                <AddClientForm getClients={getClients} />
            </div>
            <div className='tableContainer'>
                <ClientsTable clients={clients} deleteClient={deleteClient} className="table" />
            </div>
        </div>
    )
}

export default AddClient;