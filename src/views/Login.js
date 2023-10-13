import '../views/Login.css'

const Login = () => {
    return (
        <div className='login'>
            <form>
                <input type="text" name="username" placeholder="E-mail" />
                <input type="password" name="password" placeholder="Hasło" />
                <button type="submit" id="btn-wrapper">Zaloguj</button>
            </form>
        </div>
    )
}

export default Login;