import {Route, Routes, Navigate} from 'react-router-dom';
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import App from "./App.jsx"

function AuthRoutes(){
    return(
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<App />} />
        </Routes>
    )
}

export default AuthRoutes;