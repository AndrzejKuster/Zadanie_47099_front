import AddClientForm from './components/AddClientForm'
import './App.css';
import ClientsTable from './components/ClientsTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config';
import FindCompany from './components/FindCompany';

function App() {

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
    <div className="App">
      <div className='formContainer'>
        <AddClientForm getClients={getClients} />
      </div>

      <div className='formFindConpany'>
        <FindCompany />
      </div>

      <div className='tableContainer'>
        <ClientsTable clients={clients} deleteClient={deleteClient} className="table" />
      </div>

    </div>
  );
}

export default App;
