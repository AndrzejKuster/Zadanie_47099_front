import '../views/Login.css'
import { useState } from 'react';
import axios from 'axios';
import config from '../config'
import { Navigate } from 'react-router-dom';

const Login = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginMessage, setLoginMessage] = useState('')

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const findUser = (e) => {
        const userLogin = {
            username: username,
            password: password
        }
        e.preventDefault()
        axios
            .post(config.api.url + '/user/find', userLogin)
            .then((res) => {
                setLoginMessage("")
                props.setUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
            }
            )
            .catch((err) => {
                console.log("err axios: ", err.response.data.message)
                setLoginMessage(err.response.data.message)
            })
    }


    return (
        <div className='login'>
            {props.user && <Navigate to="/clients" />}
            <form action='#' onSubmit={findUser}>
                {loginMessage && <h2>{loginMessage}</h2>}
                <input type="text" name="username" placeholder="E-mail/username"
                    value={username}
                    onChange={handleChangeUsername} />
                <input type="password" name="password"
                    value={password}
                    placeholder="Hasło"
                    onChange={handleChangePassword} />
                <button type="submit" id="btn-wrapper">Zaloguj</button>
            </form>
        </div>
    )
}

export default Login;