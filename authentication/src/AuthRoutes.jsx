import {Route, Routes, Navigate} from 'react-router-dom';
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import Enter from './inside/Enter.jsx'
import App from "./App.jsx"

const PrivateRoute = ({children}) => {
    const token = localStorage.getItem('token');

    if(!token){
        console.log("no token");
        return <Navigate to="/login"/>
    }

    return children;
};

function AuthRoutes(){
    return(
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<App />} />
            <Route
                path="/enter"
                element={
                    <PrivateRoute>
                        <Enter />
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}

export default AuthRoutes;