import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { Link } from "react-router-dom";
import './ClientsList.css'

const ClientsList = () => {

    const [clients, setClients] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [name, setName] = useState('')

    const handleChangeNIP = (e) => {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        findClient();
    }, [searchTerm]);

    const findClient = () => {
        axios
            .get(config.api.url + '/clients/find?searchTerm=' + `${searchTerm}`)
            .then((res) => {
                setName(res.data.name);
                setClients(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteClient = (rowId) => {
        if (window.confirm('Czy na pewno usunąć firmę?')) {
            axios
                .delete((config.api.url + '/clients/delete/' + rowId))
                .then((res) => {
                    if (res.data.deleted) {
                        findClient()
                        window.alert("Firma została usunięta!")
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
                <div className="searchAndAdd">
                    <input
                        type="text"
                        id="nip"
                        value={searchTerm}
                        onChange={handleChangeNIP}
                        placeholder="Wpisz szukany NIP"
                    />

                    <div className='btn-wrapper'>
                        <Link to={"/clients/add"}>
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
                                        <Link to={`/clients/edit/${row._id}`}>
                                            <button
                                                className="edit">Edytuj</button>
                                        </Link>
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