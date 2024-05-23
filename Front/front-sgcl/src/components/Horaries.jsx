import './App.css'
import { usersApi, apiUrls } from "./api/userApi";
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';


export function Horary() {
    const [laboratories, setLaboratories] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        usersApi.get(apiUrls.getAllLaboratories)
            .then(respLaboratories => {
                setLaboratories(respLaboratories.data);
            })
            .catch(error => {
                console.error('Error fetching laboratories:', error);
            });
    }, []);

    return (
        <>
            <nav className='Horary-Select'>
                <ul className='H-Menu'>
                    <li tabIndex="0">Laboratorios
                        <ul className='V-Menu'>
                            {laboratories.map(laboratory => (
                                <li key={laboratory.labName}>{laboratory.labName}</li>
                            ))}
                        </ul>
                    </li>
                    <li tabIndex="0">Grupos
                        <ul className='V-Menu'>
                            <li>1 "A"</li>
                            <li>2 "B"</li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className='H-Title'>Cisco</div>
            <div className='Horaries'>
                <div style={{ backgroundColor: 'white' }}></div>
                <div className='Horary-Titles'>Lunes</div>
                <div className='Horary-Titles'>Martes</div>
                <div className='Horary-Titles'>Miércoles</div>
                <div className='Horary-Titles'>Jueves</div>
                <div className='Horary-Titles'>Viernes</div>
                <div className='Horary-Titles'>12:00 - 2:00</div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-Titles'>2:00 - 4:00</div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-Titles'>4:00 - 6:00</div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-Titles'>6:00 - 8:00</div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
                <div className='Horary-dates'></div>
            </div>


        </>


    )
}