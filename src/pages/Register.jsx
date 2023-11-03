import Cookies from "js-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [username, setUsername] = useState('user')
    const [email, setEmail] = useState('user@gamil.com')
    const [password, setPassword] = useState('qwerty')
    
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
            console.log(response)

            if(response.ok){
                const data = response.json()
                console.log(data)
                console.log(data.value)
                console.log(data.jwt)
                Cookies.set('token', data.jwt, {expires: 1, sameSite:'strict'})
                navigate('/')
            }else{
                new Error
                
            }
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