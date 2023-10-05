import React, { useState } from 'react'
import authServices from '../../services/authServices'
import {useDispatch} from 'react-redux'



const LoginPage = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegistratio = async () => {
        console.log('Функція викликана');
        await authServices.registration(dispatch)(email, password);
    };
    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type='text'
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='text'
                placeholder='Password'
            />
            <button onClick = {handleRegistratio}>Зареєструватись</button>
        </div>
    )
}

export default LoginPage