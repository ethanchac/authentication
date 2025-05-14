import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleClick = async () => {
        try{
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            alert("loged in");
        }catch(err){
            alert('error');
        }
    }

    return(
        <>
            <input
                type="text"
                placeholder="log-in"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick}>Log in</button>
            <Link to="/signup">Sign up</Link>
        </>
    )
}

export default Login