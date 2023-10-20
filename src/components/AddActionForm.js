import { useState } from 'react';
import '../components/AddActionForm.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import config from '../config'
import SelectAction from './SelectAction';
import { useNavigate, useParams } from 'react-router-dom';

const AddActionForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [action, setAction] = useState({ key: '', val: '' })
    const [description, setDescription] = useState('')
    const params = useParams();
    const navigate = useNavigate();

    const choicesOfActions = [
        ['choose', 'wybierz rodzaj kontaktu'],
        ['phone', 'kontakt telefoniczny'],
        ['meet', 'spotkanie'],
        ['sms', 'sms do klienta'],
        ['email', 'email do klienta'],
        ['other', 'inne']
    ]

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleChangeActionSelect = (e) => {
        setAction({
            key: e.target.value,
            val: e.target.options[e.target.selectedIndex].innerText
        })
    }

    const saveClientAction = (eventObj) => {
        axios.post(config.api.url + '/actions/add', eventObj, { mode: 'cors' })
            .then((res) => {
                resetClientActionForm()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const resetClientActionForm = () => {
        setSelectedDate(null);
        setDescription(null);
    }

    const validateActionForm = (e) => {
        e.preventDefault()
        if (!selectedDate || !action.key || !description) {
            window.alert("Uzupełnij wszystkie pola formularza!")
        } else {
            const newClientAction = {
                date: selectedDate,
                actionType: action,
                description: description,
                client_id: params.clientId
            }
            saveClientAction(newClientAction)
            window.alert("Dopisano nowe zdarzenie do klienta")
            navigate('/clients')
        }
    }

    return (
        <div>
            <h2>Dodanie wydarzenia klientowi </h2>
            <div className='form-container'>
                <form onSubmit={validateActionForm}>
                    <div className='wrapper'>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy/MM/dd"
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
            </div>
        </div>
    )
}

export default AddActionForm;