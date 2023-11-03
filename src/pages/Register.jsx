import Cookies from "js-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    let navigate = useNavigate()

    const handleSubmit= () => {
        const data = {username: username, email: email, password: password}

        fetch('http://localhost:1337/api/auth/local/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(
            response => {
                response.ok ? response.json() : new Error
            }
        )
        .then(data => {
            console.log(data)
            Cookies.set('token', data.jwt, {expires: 1, sameSite:'strict'})
            navigate('/')
        })
        .catch((e) =>
            console.error(e.message)
        )
    }

    
    return(
        <div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={()=> handleSubmit()}>Submit</button>
        </div>
        )
    }