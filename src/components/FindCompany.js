import { useState } from 'react';
import '../components/FindCompany.css'
import axios from 'axios';
import config from '../config'

const FindCompany = () => {

    const [nip, setNip] = useState('')
    const [name, setName] = useState('')
    const [client_id, setClient_id] = useState('')

    const handleChangeName = (e) => {
        setNip(e.target.value)
    }

    const showActions = (e) => {
        axios
            .get(config.api.url + '/actions/clients/' + client_id +'/actions')
            .then((res) => {
                console.log("zapisane akcje to klienta: ",res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const findClient = (e) => {
        axios
            .get(config.api.url + '/clients/find/' + e.target[0].value)
            .then((res) => {
                console.log(res.data)
                setName(res.data.name)
                console.log("id w bazie: ",res.data._id);
                setClient_id(res.data._id)
                showActions()

            })
            .catch((err) => {
                console.log(err)
                if (err.code === "ERR_BAD_REQUEST") {
                    console.log("nie mamy takiego klienta lub błędnie wpisany NIP!")
                }
            })
    }


    return (
        <div>
            <div>
                <form action='#' onSubmit={findClient}>
                    <div className="wrapper">
                        <label htmlFor="nip">Wpisz NIP szukanej firmy</label>
                        <input type="text" id="nip" value={nip} onChange={handleChangeName} />
                    </div>
                    <div className="wrapper">
                        <button type="submit">Szukaj</button>
                    </div>
                </form>
                <pre> Firma: {name}    data akcji:    select akcji:  opis akcji:</pre>
                
                <table>
                    <thead>
                        <tr>
                            <th>data akcji</th>
                            <th>rodzaj akcji</th>
                            <th>opis akcji</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>test</th>
                            <th>test</th>
                            <th>test</th>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FindCompany;