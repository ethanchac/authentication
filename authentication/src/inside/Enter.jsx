import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function Enter() {
    const [selected, setSelected] = useState('');
    const [colors, setColors] = useState([]);
    const [newColor, setNewColor] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/api/auth/user/me',{
            headers: {Authorization: `Bearer ${token}`},
        })
        .then((res) => {
            console.log(res.data);
            setSelected(res.data.selectedColor);
            setColors(res.data.favouriteColours);
        })
    }, []);

    const handleSelect = async (color) => {
        setSelected(color);
        const token = localStorage.getItem('token');
        await axios.post(
            'http://localhost:5000/api/auth/user/color',
            {color},
            {headers: {Authorization: `Bearer ${token}`}}
        )
    }
    const handleLogout = async () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    const handleAddColor = async () => {
        if(!newColor) return;

        const token = localStorage.getItem('token');
        await axios.post(
            'http://localhost:5000/api/auth/user/add-color',
            {color: newColor},
            {headers: {Authorization: `Bearer ${token}`}}
        );
        setColors((prev) => [...prev, newColor]);
        setNewColor('');
    }

    return (
    <>
        <p>Which Colour do you like most?</p>
        <ul>
        {colors.map((color) => (
            <li key={color}>
            <label>
                <input
                type="radio"
                name="color"
                value={color}
                checked={selected === color}
                onChange={() => handleSelect(color)}
                />
                {color}
            </label>
            </li>
        ))}
        </ul>

        <input  
            type="text"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="add new colour"
        />
        <button onClick={handleAddColor}>Add Color</button>
        <button onClick={handleLogout}>Logout</button>
        </>

    );
}

export default Enter;
