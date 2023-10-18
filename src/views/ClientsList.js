import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { Link } from "react-router-dom";
import FindCompany from "../components/FindCompany";

const ClientsList = () => {

    const [clients, setClients] = useState([])
    const [editClientId, setEditClientId] = useState('')

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

    const editClient = (editClientId) => {
        console.log("sprawdzam id: ", editClientId);
        if (window.confirm('Czy na pewno edytować firmę?')) {
            axios
                .put((config.api.url + '/clients/delete/' + editClientId))
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
            <div>

                <h1>Lista klientów</h1>
                <div className="btns">
                    <div className='btn-wrapper'>
                        <Link to={"/add-action"}>
                            <button className='searchClient' >Wyszukaj klienta</button>
                        </Link>
                    </div>
                    <div className='btn-wrapper'>
                        <Link to={"/add-client"}>
                            <button className='addClient' >Dodaj nowego klienta</button>
                        </Link>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nazwa firmy</th>
                            <th>Adres</th>
                            <th>NIP</th>
                            <th>Edycja firmy</th>
                            <th>Usuwanie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((row, index) => {
                            return (
                                <tr key={row._id}>
                                    <td>{index}</td>
                                    <td>{row.name}</td>
                                    <td>{row.address}</td>
                                    <td>{row.NIP}</td>
                                    <td>
                                        <Link to={`/edit-client/${row._id}`}>
                                            <button
                                                className="edit">Edytuj</button>
                                        </Link>
                                        {/* <button onClick={() => { }} className='edit'>Edytuj</button> */}
                                    </td>
                                    <td>
                                        <button onClick={() => { deleteClient(row._id) }} className='delete'>Usuń</button>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
};

export default ClientsList;