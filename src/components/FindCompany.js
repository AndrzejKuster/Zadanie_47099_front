import { useState } from 'react';
import '../components/FindCompany.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import config from '../config'
import SelectAction from './SelectAction';

const FindCompany = () => {

    const [nip, setNip] = useState('')
    const [name, setName] = useState('')
    const [client_id, setClient_id] = useState('')
    const [selectedDate, setSelectedDate] = useState(null);
    const [action, setAction] = useState({ key: '', val: '' })
    const [description, setDescription] = useState('')

    const choicesOfActions = [
        ['phone', 'kontakt telefoniczny'],
        ['meet', 'spotkanie'],
        ['sms', 'sms do klienta'],
        ['email', 'email do klienta'],
        ['other', 'inne']
    ]
    const handleChangeName = (e) => {
        setNip(e.target.value)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleChangeActionSelect = (e) => {
        console.log(e.target.options)
        setAction({
            key: e.target.value,
            val: e.target.options[e.target.selectedIndex].innerText
        })
    }

    const showActions = (e) => {
        axios
            .get(config.api.url + '/actions/clients/' + client_id + '/actions')
            .then((res) => {
                console.log("zapisane akcje to klienta: ", res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const saveClientAction = (eventObj) => {
        console.log(eventObj)
        console.log('saveClientAction')
        axios.post(config.api.url + '/actions/add', eventObj, {mode: 'cors'})
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const resetClientActionForm = () => {

    }

    const validateActionForm = (e) => {
        e.preventDefault()

        const newClientAction = {
            date: selectedDate,
            actionType: action,
            description: description,
            client_id: client_id
        }
        console.log("akcja klienta do zapisu do bazy: ",newClientAction);
        saveClientAction(newClientAction)
        resetClientActionForm()
    }

    const findClient = (e) => {
        axios
            .get(config.api.url + '/clients/find/' + e.target[0].value)
            .then((res) => {
                console.log(res.data)
                setName(res.data.name)
                console.log("id w bazie: ", res.data._id);
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

                <form action='#' onSubmit={validateActionForm}>
                    <div className='wrapper'>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            placeholderText="Ustaw datę"
                        />
                    </div>
                    <div className='wrapper'>
                        <SelectAction
                            values={choicesOfActions}
                            selectedValue={choicesOfActions.key}
                            onValueChange={handleChangeActionSelect}
                            id="actionSelect"
                        />
                    </div>
                    <div className='wrapper'>
                        <input type="text" id="description" placeholder='Dodatkowy opis' onChange={handleDescriptionChange} />
                    </div>
                    <div className='wrapper'>
                        <button type="submit">Dodaj akcję do firmy</button>
                    </div>
                </form>


                <table>
                    <thead>
                        <tr>
                            <th>data kontaktu</th>
                            <th>rodzaj akcji</th>
                            <th>dodatkowy opis</th>
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