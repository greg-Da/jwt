import { useDispatch } from 'react-redux'
import Cookies from "js-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logIn } from '../state/auth/authSlice'



export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    let navigate = useNavigate()
    let dispatch = useDispatch()

    const handleSubmit= () => {
        const data = {identifier: email, password: password}

        fetch('http://localhost:1337/api/auth/local', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(
            response => {
                if(response.ok){
                    return response.json()
                }else{
                    throw new Error('Something went wrong')
                }
            }
        )
        .then(data => {
            console.log(data)
            Cookies.set('token', data.jwt, {expires: 1, sameSite:'strict'})
            dispatch(logIn())
            navigate('/')
        })
        .catch((e) =>
            console.error(e.message)
        )
    }

    
    return(
        <div>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={()=> handleSubmit()}>Submit</button>
        </div>
        )
    }